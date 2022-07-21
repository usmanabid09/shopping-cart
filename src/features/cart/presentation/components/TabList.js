import { useSelector } from "react-redux";
import TabListItem from "./TabListItem";

function TabList() {
    const tabs = useSelector(({cartSlice: {uiState}}) => uiState.tabs);
    return (
        <div className="tab-list">
            {tabs.map(tab => <TabListItem key={tab} tab={tab}/>)}
        </div>
    )
}

export default TabList;