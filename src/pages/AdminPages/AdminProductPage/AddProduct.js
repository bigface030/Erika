import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { sizeMap } from '../../../constants/mapping';
import { P, fontTheme, TextBtn, Btn } from '../../../constants/style';

import useAdminProduct from '../../../hooks/useAdminProduct';
import { useCallback } from 'react';
import { uploadImageAPI } from '../../../webAPI/productAPI';
import { Loader } from '../../../components/Loader';

const StepContainer = styled.div`
	border: 1px solid #aaa8;
	border-radius: 0.5em;
	background-color: #eee;
	${props => !props.$active && 'opacity: 0.5;'}
	transition: .5s;
	padding: 10px;
`;

const FirstStepContainer = styled(StepContainer)``;
const SecondStepContainer = styled(StepContainer)`
	margin-bottom: 20px;
	max-height: ${props =>
		props.$step >= 2 || props.$step === 0 ? '1000px' : '80px'};
	overflow: hidden;
	transition: 1s;
`;
const ThirdStepContainer = styled(StepContainer)`
	max-height: ${props =>
		props.$step >= 3 || props.$step === 0 ? '1000px' : '80px'};
	overflow: hidden;
	transition: 1s;
`;

const MainContainer = styled.main`
	width: 70%;
	flex-grow: 1;
	display: flex;
	& > div {
		width: 50%;
		padding: 10px;
	}
`;

const LeftContainer = styled.div``;
const RightContainer = styled.div``;

const FlowNode = styled.div`
	${fontTheme.span};
	margin-right: 10px;
	background-color: ${props => props.theme.color.lightGrey};
	color: ${props => props.theme.color.white};
	min-width: 60px;
	min-height: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	& > p {
		${fontTheme.h4}
	}
`;

const FlowText = styled.div`
	${fontTheme.h4}
	padding-right: 10px;
	color: ${props => props.theme.color.lightGrey};
	min-width: ${props => props.$fixed && '108px'};
`;

const FlowContent = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	padding: 10px;
	position: relative;
	& + li::before {
		content: '>';
		position: absolute;
		left: -10px;
		${fontTheme.h3}
		color: ${props => props.theme.color.lightGrey};
	}
	${FlowNode} {
		background-color: ${props => props.$active && props.theme.color.black};
	}
	${FlowText} {
		color: ${props => props.$active && props.theme.color.black};
	}
`;

const InputBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0px 10px 10px;
	${fontTheme.p}
	position: relative;
	& label {
		line-height: 2em;
	}
	& input,
	select,
	textarea {
		${fontTheme.span}
		padding: 3px 8px;
		&:invalid {
			border: 2px solid red;
			& ~ span {
				&::before {
					${fontTheme.span}
					color: ${props => props.theme.color.alert};
					content: '這是必填欄位';
				}
			}
		}
	}
	& > input,
	> select,
	> textarea {
		margin: 0 5px;
	}
	& span {
		position: absolute;
		top: 10px;
		right: 15px;
		${fontTheme.span}
		color: ${props => props.theme.color.alert};
	}
`;

const BtnContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 20px 10px 10px;
	& > button {
		margin: 0px 5px;
	}
`;

const UploadBtn = styled(TextBtn)`
	${fontTheme.h5}
	font-weight: ${props => props.theme.fontWeight.m};
	padding: 0px;
	& label {
		padding: 5px 8px;
		cursor: pointer;
	}
	& + input {
		display: none;
	}
`;

const AddBtn = styled(TextBtn)`
	${fontTheme.h5}
	font-weight: ${props => props.theme.fontWeight.m};
	padding: 3px 8px;
`;

const ImgInput = styled.div`
	display: flex;
	align-items: center;
	margin: 0 5px;
	& + div {
		margin-top: 5px;
	}
	& input {
		flex-grow: 9.5;
		font-size: ${props => props.theme.fontSize.bodySmall};
	}
	& button {
		flex-grow: 0.5;
		margin-left: 5px;
	}
`;

const CheckInput = styled.div`
	& input {
		margin: 0 5px;
		& ~ input {
			margin-left: 10px;
		}
	}
`;

const InputTitle = styled.div`
	margin-left: 0;
	display: flex;
	align-items: center;
	& > button {
		margin-left: 10px;
	}
`;

const SizeInput = styled.div`
	display: flex;
	flex-wrap: wrap;
	& input {
		margin: 0 5px;
		width: 40px;
	}
	align-items: baseline;
	margin: 5px 5px 0;
	& > div {
		// flex-grow: 1;
		display: flex;
		& > input {
			// flex-grow: 1;
		}
	}
	& > button {
		margin: 5px 5px 0;
		& svg {
			font-size: ${props => props.theme.fontSize.h4};
		}
	}
`;

const ColorInput = styled.div`
	display: flex;
	& input {
		margin: 0 5px;
	}
	& > div {
		display: flex;
		align-items: baseline;
		margin: 5px 5px 0;
		flex-grow: 1;
		& > input {
			flex-grow: 1;
		}
	}
	& > button {
		margin: 5px 5px 0;
		& svg {
			font-size: ${props => props.theme.fontSize.h4};
		}
	}
`;

const PatternInput = styled.div`
	margin: 0 5px;
	& input {
		margin: 0 5px;
		width: 40px;
	}
	& + div {
		margin-top: 5px;
	}
`;

const PriceInput = styled.div`
	margin: 0 5px;
	& input {
		margin: 0 5px;
		width: 60px;
	}
`;

export const FirstStepInputs = ({
	step,
	name,
	gender,
	category,
	desc,
	material,
	washing,
	images,
	handleInputChange,
	setImages,
}) => {
	const errorMessage = useSelector(state => state.general.errorMessage);

	const [isLoading, setIsLoading] = useState(false);

	const handleUploadImage = e => {
		if (!e.target.files[0]) return;
		setIsLoading(true);
		const index = parseInt(e.target.id.slice(-1));
		uploadImageAPI(e.target.files[0]).then(result => {
			setImages(
				images.map((image, i) =>
					i === index ? { ...image, src: result.data.link } : image
				)
			);
			setIsLoading(false);
		});
	};

	return (
		<>
			<InputBlock>
				<label htmlFor="name">品名</label>
				<input
					value={name}
					onChange={handleInputChange}
					type="text"
					name="name"
					id="name"
					disabled={step > 1}
					autoComplete="off"
					required
				/>
				<span>{errorMessage === '商品名稱重複' && errorMessage}</span>
			</InputBlock>
			<InputBlock>
				<label>性別</label>
				<CheckInput>
					<input
						checked={gender === 'M'}
						onChange={handleInputChange}
						type="radio"
						name="gender"
						id="male"
						disabled={step > 1}
						required
					/>
					<label htmlFor="male">男裝</label>
					<input
						checked={gender === 'F'}
						onChange={handleInputChange}
						type="radio"
						name="gender"
						id="female"
						disabled={step > 1}
						required
					/>
					<label htmlFor="female">女裝</label>
					<span></span>
				</CheckInput>
			</InputBlock>
			<InputBlock>
				<label htmlFor="category">分類</label>
				<select
					value={category}
					onChange={handleInputChange}
					name="category"
					id="category"
					disabled={step !== 1}
					required
					pattern="."
				>
					<option value="">-----</option>
					<option value="tops">上衣類</option>
					<option value="shirts">襯衫類</option>
					<option value="knit">針織衫 / 毛衣</option>
					<option value="one_piece">洋裝類</option>
					<option value="outer">外套類</option>
					<option value="bottoms">褲裝類</option>
					<option value="skirts">裙子類</option>
					<option value="general">配件類</option>
				</select>
				<span></span>
			</InputBlock>
			<InputBlock>
				<label htmlFor="desc">簡介</label>
				<textarea
					value={desc}
					onChange={handleInputChange}
					name="desc"
					id="desc"
					disabled={step > 1}
					rows="5"
					autoComplete="off"
				/>
			</InputBlock>
			<InputBlock>
				<label htmlFor="material">材質</label>
				<textarea
					value={material}
					onChange={handleInputChange}
					name="material"
					id="material"
					disabled={step > 1}
					rows="2"
					autoComplete="off"
				/>
			</InputBlock>
			<InputBlock>
				<label htmlFor="washing">洗滌方式</label>
				<textarea
					value={washing}
					onChange={handleInputChange}
					name="washing"
					id="washing"
					disabled={step > 1}
					rows="4"
					autoComplete="off"
				/>
			</InputBlock>
			<InputBlock>
				<label htmlFor="image">照片 (第一張為封面)</label>
				{images.map((image, i) => (
					<ImgInput key={i}>
						<input
							value={image.src}
							placeholder={!i ? '(必填)' : '(選填)'}
							onChange={handleInputChange}
							type="text"
							name="image"
							id={`image_${i}`}
							autoComplete="off"
							disabled={step > 1}
							required={i === 0}
						/>
						<UploadBtn $white $active={step === 1 || step === 0}>
							<label htmlFor={`upload_${i}`}>上傳照片</label>
						</UploadBtn>
						<input
							type="file"
							id={`upload_${i}`}
							name="upload"
							accept="image/*"
							onChange={handleUploadImage}
						/>
						<span></span>
					</ImgInput>
				))}
			</InputBlock>
			{isLoading && <Loader />}
		</>
	);
};

const FirstStep = ({ step, setStep, productToAdd, setProductToAdd }) => {
	const {
		name,
		gender,
		category,
		desc,
		material,
		washing,
		images,
		setImages,
		handleInputChange,
		handleSetStep,
	} = useAdminProduct({ step, setStep, productToAdd, setProductToAdd });

	return (
		<FirstStepContainer $active={step === 1}>
			<FlowContent $active>
				<FlowNode>
					Step
					<p>01</p>
				</FlowNode>
				<FlowText $fixed>產品基本資料</FlowText>
			</FlowContent>
			{/* <form onSubmit={e => e.preventDefault()}> */}
			<FirstStepInputs
				{...{
					step,
					name,
					gender,
					category,
					desc,
					material,
					washing,
					images,
					handleInputChange,
					setImages,
				}}
			/>
			<BtnContainer>
				<TextBtn
					type="button"
					name="next"
					onClick={handleSetStep}
					$active={step === 1}
					disabled={step !== 1}
				>
					下一步
				</TextBtn>
			</BtnContainer>
			{/* </form> */}
		</FirstStepContainer>
	);
};

export const SecondStepInputs = ({
	step,
	group,
	sizes,
	colors,
	handleInputChange,
	handleAddPattern,
	handleDeletePattern,
	sizesLength,
	colorsLength,
}) => {
	const errorMessage = useSelector(state => state.general.errorMessage);

	return (
		<>
			<InputBlock>
				<InputTitle>
					<label>尺寸</label>
					{group !== 'Size_general' && (
						<AddBtn
							type="button"
							onClick={handleAddPattern(group)}
							name="size"
							$white
							$active={step === 2 || step === 0}
						>
							新增尺寸
						</AddBtn>
					)}
				</InputTitle>
				{sizes.length > 0 ? (
					group && sizeMap[group] ? (
						sizes.map((size, i) => (
							<SizeInput key={i}>
								<div>
									<label htmlFor={`size_${i}`}>尺碼:</label>
									<input
										value={size.size}
										onChange={handleInputChange}
										type="text"
										name="size"
										id={`size_${i}`}
										size="2"
										autoComplete="off"
										disabled={
											step !== 2 &&
											(sizesLength ? i < sizesLength : 1)
										}
										required
									/>
									<span>
										{errorMessage === '尺碼不可重複' &&
											errorMessage}
									</span>
								</div>
								{Object.entries(sizeMap[group]).map(
									(spec, j) => (
										<div key={j}>
											<label htmlFor={`${spec[0]}_${i}`}>
												{spec[1]}:
											</label>
											{spec[0] === 'waist' ? (
												<>
													<input
														value={size[spec[0]][0]}
														onChange={
															handleInputChange
														}
														type="number"
														name="size"
														id={`${spec[0]}_0_${i}`}
														min="0"
														disabled={
															step !== 2 &&
															step !== 0
														}
													/>
													~
													<input
														value={size[spec[0]][1]}
														onChange={
															handleInputChange
														}
														type="number"
														name="size"
														id={`${spec[0]}_1_${i}`}
														min="0"
														disabled={
															step !== 2 &&
															step !== 0
														}
													/>
												</>
											) : (
												<input
													value={size[spec[0]]}
													onChange={handleInputChange}
													type="number"
													name="size"
													id={`${spec[0]}_${i}`}
													min="0"
													disabled={
														step !== 2 && step !== 0
													}
												/>
											)}
										</div>
									)
								)}
								<Btn
									onClick={handleDeletePattern(i)}
									type="button"
									name="size"
									disabled={
										step !== 2 &&
										(sizesLength ? i < sizesLength : 1)
									}
								>
									<FontAwesomeIcon icon={faTimes} />
								</Btn>
							</SizeInput>
						))
					) : (
						<P>單一尺寸</P>
					)
				) : (
					<>
						{Array(2)
							.fill('')
							.map((a, i) => (
								<SizeInput key={i}>
									<div>
										<label>尺碼:</label>
										<input
											value=""
											type="text"
											name="size"
											size="2"
											autoComplete="off"
											disabled
											required
										/>
									</div>
								</SizeInput>
							))}
					</>
				)}
			</InputBlock>
			<InputBlock>
				<InputTitle>
					<label>顏色</label>
					<AddBtn
						type="button"
						onClick={handleAddPattern()}
						name="color"
						$white
						$active={step === 2 || step === 0}
					>
						新增顏色
					</AddBtn>
				</InputTitle>
				{colors &&
					colors.map((color, i) => (
						<ColorInput key={i}>
							<div>
								<label htmlFor={`name_${i}`}>名稱:</label>
								<input
									value={color.name}
									onChange={handleInputChange}
									type="text"
									name="color"
									id={`name_${i}`}
									size="10"
									autoComplete="off"
									disabled={
										step !== 2 &&
										(colorsLength ? i < colorsLength : 1)
									}
									required
								/>
								<span>
									{errorMessage === '名稱不可重複' &&
										errorMessage}
								</span>
							</div>
							<div>
								<label htmlFor={`code_${i}`}>色碼:</label>
								<input
									value={color.code}
									onChange={handleInputChange}
									type="color"
									name="color"
									id={`code_${i}`}
									disabled={step !== 2 && step !== 0}
								/>
							</div>
							<Btn
								onClick={handleDeletePattern(i)}
								type="button"
								name="color"
								disabled={
									step !== 2 &&
									(colorsLength ? i < colorsLength : 1)
								}
							>
								<FontAwesomeIcon icon={faTimes} />
							</Btn>
						</ColorInput>
					))}
			</InputBlock>
		</>
	);
};

const SecondStep = ({ step, setStep, productToAdd, setProductToAdd }) => {
	const {
		sizes,
		setSizes,
		colors,
		setColors,
		error,
		handleInputChange,
		handleSetStep,
		handleFormSubmit,
		handleAddPattern,
		handleDeletePattern,
	} = useAdminProduct({ step, setStep, productToAdd, setProductToAdd });

	const getGroup = useCallback(() => {
		switch (productToAdd.category) {
			case 'tops':
			case 'shirts':
			case 'knit':
			case 'one_piece':
			case 'outer': {
				return 'Size_top';
			}
			case 'bottoms': {
				return 'Size_bottom';
			}
			case 'skirts': {
				return 'Size_skirt';
			}
			case 'general': {
				return 'Size_general';
			}
			default:
				break;
		}
	}, [productToAdd]);

	useEffect(() => {
		if (step !== 2) return;
		if (!productToAdd) return;
		if (getGroup() === 'Size_general') {
			setSizes([{ size: 'one' }]);
		} else {
			let arr = Array(2).fill({ size: '' });
			Object.keys(sizeMap[getGroup()]).map(ele =>
				arr.map(a => (a[ele] = ele === 'waist' ? [0, 0] : 0))
			);
			setSizes(arr);
		}
		setColors(Array(2).fill({ name: '', code: '#000000' }));
	}, [productToAdd, step, setSizes, setColors, getGroup]);

	return (
		<SecondStepContainer $active={step === 2} $step={step}>
			<FlowContent $active>
				<FlowNode>
					Step
					<p>02</p>
				</FlowNode>
				<FlowText $fixed>設定尺寸及顏色</FlowText>
			</FlowContent>
			{getGroup() && (
				// <form onSubmit={e => e.preventDefault()}>
				<>
					<SecondStepInputs
						{...{
							step,
							sizes,
							colors,
							error,
							handleInputChange,
							handleAddPattern,
							handleDeletePattern,
						}}
						group={getGroup() || null}
					/>
					<BtnContainer>
						<TextBtn
							type="button"
							name="back"
							onClick={handleSetStep}
							$active={step === 2}
							disabled={step !== 2}
						>
							上一步
						</TextBtn>
						<TextBtn
							type="button"
							name="next"
							onClick={handleSetStep}
							$active={step === 2}
							disabled={step !== 2}
						>
							下一步
						</TextBtn>
						<TextBtn
							type="submit"
							name="add_first"
							onClick={handleFormSubmit}
							$active={step === 2}
							disabled={step !== 2}
						>
							略過並儲存
						</TextBtn>
					</BtnContainer>
				</>
				// </form>
			)}
		</SecondStepContainer>
	);
};

const ThirdStepInputs = ({
	step,
	patterns,
	isOn,
	isSale,
	priceStandard,
	priceSale,
	handleInputChange,
}) => {
	return (
		<>
			<InputBlock>
				<label>存貨數量</label>
				{patterns &&
					patterns.map((pattern, i) => (
						<PatternInput key={i}>
							尺寸: {pattern.size}, 顏色: {pattern.color},
							<label htmlFor={`total_${i}`}> 數量:</label>
							<input
								value={pattern.total}
								onChange={handleInputChange}
								type="number"
								name="pattern"
								id={`total_${i}`}
								min="0"
								disabled={step !== 3}
							/>
						</PatternInput>
					))}
			</InputBlock>
			<InputBlock>
				<label>商品價格</label>
				<CheckInput>
					<input
						checked={isOn}
						onChange={handleInputChange}
						type="checkbox"
						name="is_on"
						id="is_on"
						disabled={step !== 3}
					/>
					<label htmlFor="is_on">上架中</label>
					<input
						value={isSale}
						onChange={handleInputChange}
						type="checkbox"
						name="is_sale"
						id="is_sale"
						disabled={step !== 3}
					/>
					<label htmlFor="is_sale">特價中</label>
				</CheckInput>
				<PriceInput>
					<label htmlFor="price_standard">原價:</label>
					<input
						value={priceStandard}
						onChange={handleInputChange}
						type="number"
						name="price_standard"
						id="price_standard"
						min="0"
						disabled={step !== 3}
					/>
					<label htmlFor="price_standard">特價:</label>
					<input
						value={priceSale}
						onChange={handleInputChange}
						type="number"
						name="price_sale"
						id="price_sale"
						min="0"
						disabled={step !== 3}
					/>
				</PriceInput>
			</InputBlock>
		</>
	);
};

const ThirdStep = ({ step, setStep, productToAdd, setProductToAdd }) => {
	const {
		patterns,
		setPatterns,
		isOn,
		setIsOn,
		isSale,
		setIsSale,
		priceStandard,
		setPriceStandard,
		priceSale,
		setPriceSale,
		handleInputChange,
		handleSetStep,
		handleFormSubmit,
	} = useAdminProduct({ step, setStep, productToAdd, setProductToAdd });

	useEffect(() => {
		if (step !== 3) return;
		if (!productToAdd.sizes || !productToAdd.colors) return;
		let arr = [];
		productToAdd.sizes.map(size =>
			productToAdd.colors.map(color =>
				arr.push({ size: size.size, color: color.name, total: 0 })
			)
		);
		setPatterns(arr);
		setIsOn(false);
		setIsSale(false);
		setPriceStandard(0);
		setPriceSale(0);
	}, [
		step,
		productToAdd,
		setPatterns,
		setIsOn,
		setIsSale,
		setPriceStandard,
		setPriceSale,
	]);

	return (
		<ThirdStepContainer $active={step === 3} $step={step}>
			<FlowContent $active>
				<FlowNode>
					Step
					<p>03</p>
				</FlowNode>
				<FlowText $fixed>存貨數量及商品價格</FlowText>
			</FlowContent>
			{patterns.length > 0 && (
				<form onSubmit={e => e.preventDefault()}>
					<ThirdStepInputs
						{...{
							step,
							patterns,
							isOn,
							isSale,
							priceStandard,
							priceSale,
							handleInputChange,
						}}
					/>
					<BtnContainer>
						<TextBtn
							type="button"
							name="back"
							onClick={handleSetStep}
							$active={step === 3}
							disabled={step !== 3}
						>
							上一步
						</TextBtn>
						<TextBtn
							type="submit"
							name="add_second"
							onClick={handleFormSubmit}
							$active={step === 3}
							disabled={step !== 3}
						>
							略過並儲存
						</TextBtn>
						<TextBtn
							type="submit"
							name="add_third"
							onClick={handleFormSubmit}
							$active={step === 3}
							disabled={step !== 3}
						>
							送出
						</TextBtn>
					</BtnContainer>
				</form>
			)}
		</ThirdStepContainer>
	);
};

export default function AddProduct() {
	const history = useHistory();

	const [step, setStep] = useState(1);
	const [productToAdd, setProductToAdd] = useState('');

	useEffect(() => {
		if (!productToAdd) return;

		const unblock = history.block(() => {
			return window.confirm('目前的資料尚未被儲存, 是否要離開?');
		});

		return () => {
			return unblock();
		};
	}, [history, productToAdd]);

	return (
		<MainContainer>
			<LeftContainer>
				<FirstStep
					{...{ step, setStep, productToAdd, setProductToAdd }}
				/>
			</LeftContainer>
			<RightContainer>
				<SecondStep
					{...{ step, setStep, productToAdd, setProductToAdd }}
				/>
				<ThirdStep
					{...{ step, setStep, productToAdd, setProductToAdd }}
				/>
			</RightContainer>
		</MainContainer>
	);
}
