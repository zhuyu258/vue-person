import Vue from 'vue';
import {
    Autocomplete,
    Badge,Button,ButtonGroup,
    Checkbox,CheckboxGroup,Cascader,
    Dialog,DatePicker,Dropdown,DropdownMenu,DropdownItem,
    Form,FormItem,
    Input,Icon,Image,
    Loading,
    Message,MessageBox,Menu,MenuItem,MenuItemGroup,
    Option,
	Pagination,Popover,Popconfirm,
	Radio,RadioGroup,
	Select,Submenu,
    Table,TableColumn,TimeSelect,TimePicker,Tabs,Tree,TabPane,Tag,Tooltip,
    Divider,Switch,Drawer,Timeline,TimelineItem, Collapse,CollapseItem
} from 'element-ui';


Vue.use(Popconfirm);
Vue.use(Badge);
Vue.use(Radio);
Vue.use(Tag);
Vue.use(Cascader);
Vue.use(ButtonGroup);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Autocomplete);
Vue.use(TabPane);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tabs);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tree);
Vue.use(Icon);
Vue.use(Image);
Vue.use(Loading);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(MenuItemGroup);
Vue.use(Divider);
Vue.use(Switch);
Vue.use(Drawer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Tooltip);

Vue.prototype.$message = Message;
Vue.prototype.$alert   = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 };