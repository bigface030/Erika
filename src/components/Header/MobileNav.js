import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { LinkItem } from "../LinkItem"
import {
  MobileMenu, 
  ToggleBtn,
  ToggleInput,
  MobileMenuNav,
} from './style'

const CheckBox = ({id}) => {
  return (
    <>
      <ToggleInput id={id} type="checkbox"/>
      <ToggleBtn>
        <label htmlFor={id}>
            <FontAwesomeIcon icon={faChevronDown}/>
        </label>
      </ToggleBtn>
    </>
  )
}

export default function MobileNav() {
  return (
    <MobileMenuNav>
      <MobileMenu>
        <div>
          <li><LinkItem to="#" name="新品上市"/></li>
          <li>
            <CheckBox id="collection"/>
            <LinkItem to="/collection" name="商品一覽"/>
            <ul>
              <li>
                <CheckBox id="collection-men" />
                <LinkItem to="/collection/men" name="男裝"/>
                <ul>
                  <li><LinkItem to="/collection/men/tops" name="上衣類"/></li>
                  <li><LinkItem to="/collection/men/shirts" name="襯衫類"/></li>
                  <li><LinkItem to="/collection/men/knit" name="針織衫 / 毛衣"/></li>
                  <li><LinkItem to="/collection/men/bottoms" name="褲裝類"/></li>
                  <li><LinkItem to="/collection/men/outer" name="外套類"/></li>
                  <li><LinkItem to="/collection/men/general" name="配件類"/></li>
                </ul>
              </li>
              <li>
                <CheckBox id="collection-women" />
                <LinkItem to="/collection/women" name="女裝"/>
                <ul>
                  <li><LinkItem to="/collection/women/tops" name="上衣 / 襯衫"/></li>
                  <li><LinkItem to="/collection/women/knit" name="針織衫 / 毛衣"/></li>
                  <li><LinkItem to="/collection/women/bottoms" name="褲裝類"/></li>
                  <li><LinkItem to="/collection/women/skirts" name="裙子類"/></li>
                  <li><LinkItem to="/collection/women/one_piece" name="洋裝類"/></li>
                  <li><LinkItem to="/collection/women/outer" name="外套類"/></li>
                  <li><LinkItem to="/collection/women/general" name="配件類"/></li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <CheckBox id="on-sale" />
            <LinkItem to="#" name="特價專區"/>
            <ul>
              <li><LinkItem to="#" name="秋冬女裝新品_7折起"/></li>
              <li><LinkItem to="#" name="秋冬男裝新品_7折起"/></li>
              <li><LinkItem to="#" name="春夏商品出清_3折起"/></li>
            </ul>
          </li>
          <li><LinkItem to="#" name="關於我們"/></li>
        </div>
        <div>
          <li><LinkItem to="#" name="登入"/></li>
          <li><LinkItem to="#" name="願望清單"/></li>
        </div>
      </MobileMenu>
    </MobileMenuNav>
  );
}