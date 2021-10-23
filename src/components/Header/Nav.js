import { LinkItem } from "../LinkItem"
import {
  Menu, 
  SubMenu, 
  SubMenuListFlex, 
  SubMenuListBlock, 
  MenuNav,
} from './style'

export default function Nav() {
  return (
    <MenuNav>
      <Menu>
        <li><LinkItem to="#" name="新品上市"/></li>
        <li>
          <LinkItem to="#" name="商品一覽"/>
          <SubMenu>
            <SubMenuListFlex>
              <h4><LinkItem to="#" name="男裝"/></h4>
              <ul>
                <li><LinkItem to="#" name="上衣類"/></li>
                <li><LinkItem to="#" name="襯衫類"/></li>
                <li><LinkItem to="#" name="針織衫 / 毛衣"/></li>
                <li><LinkItem to="#" name="褲裝類"/></li>
                <li><LinkItem to="#" name="外套類"/></li>
                <li><LinkItem to="#" name="鞋類"/></li>
                <li><LinkItem to="#" name="配件類"/></li>
              </ul>
            </SubMenuListFlex>
            <SubMenuListFlex>
              <h4><LinkItem to="#" name="女裝"/></h4>
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
            </SubMenuListFlex>
          </SubMenu>
        </li>
        <li>
          <LinkItem to="#" name="特價專區"/>
          <SubMenu>
            <SubMenuListBlock>
              <ul>
                <li><LinkItem to="#" name="秋冬女裝新品_7折起"/></li>
                <li><LinkItem to="#" name="秋冬男裝新品_7折起"/></li>
                <li><LinkItem to="#" name="春夏商品出清_3折起"/></li>
              </ul>
            </SubMenuListBlock>
          </SubMenu>
        </li>
        <li><LinkItem to="#" name="關於我們"/></li>
      </Menu>
    </MenuNav>
  );
}