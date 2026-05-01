export default interface MenuOptions {
  name: string;
  icon: string;
  subMenu?: subMenuOptions[];
}

export interface subMenuOptions {
  option: string;
  route: string;
}
