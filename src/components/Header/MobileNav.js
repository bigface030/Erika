import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { LinkItem } from "../LinkItem"
import {
  MobileMenu, 
  ToggleBtn,
  Input,
  MobileMenuNav,
} from './style'

export default function MobileNav() {
  return (
    <MobileMenuNav>
      <MobileMenu>
        <div>
          <li><LinkItem to="#" name="新品上市"/></li>
          <li>
            <Input id="checkbox1" type="checkbox"/>
            <label htmlFor="checkbox1">
              <ToggleBtn>
                <FontAwesomeIcon icon={faChevronDown}/>
              </ToggleBtn>
            </label>
            <LinkItem to="#" name="商品一覽"/>
            <ul>
              <li>
                <Input id="checkbox2" type="checkbox"/>
                <label htmlFor="checkbox2">
                  <ToggleBtn>
                    <FontAwesomeIcon icon={faChevronDown}/>
                  </ToggleBtn>
                </label>
                <LinkItem to="#" name="男裝"/>
                <ul>
                  <li><LinkItem to="#" name="上衣類"/></li>
                  <li><LinkItem to="#" name="襯衫類"/></li>
                  <li><LinkItem to="#" name="針織衫 / 毛衣"/></li>
                  <li><LinkItem to="#" name="褲裝類"/></li>
                  <li><LinkItem to="#" name="外套類"/></li>
                  <li><LinkItem to="#" name="鞋類"/></li>
                  <li><LinkItem to="#" name="配件類"/></li>
                </ul>
              </li>
              <li>
                <Input id="checkbox3" type="checkbox"/>
                <label htmlFor="checkbox3">
                  <ToggleBtn>
                    <FontAwesomeIcon icon={faChevronDown}/>
                  </ToggleBtn>
                </label>
                <LinkItem to="#" name="女裝"/>
                <ul>
                  <li><LinkItem to="#" name="上衣 / 襯衫"/></li>
                  <li><LinkItem to="#" name="針織衫 / 毛衣"/></li>
                  <li><LinkItem to="#" name="褲裝類"/></li>
                  <li><LinkItem to="#" name="裙子類"/></li>
                  <li><LinkItem to="#" name="洋裝類"/></li>
                  <li><LinkItem to="#" name="外套類"/></li>
                  <li><LinkItem to="#" name="鞋類"/></li>
                  <li><LinkItem to="#" name="配件類"/></li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <Input id="checkbox4" type="checkbox"/>
            <label htmlFor="checkbox4">
              <ToggleBtn>
                <FontAwesomeIcon icon={faChevronDown}/>
              </ToggleBtn>
            </label>
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