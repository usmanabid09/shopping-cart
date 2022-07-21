import { useSelector } from "react-redux";
import store from "../../../../app/Store";
import { cartSlice } from "../../store/slice";

function TabListItem({tab}) {
    const selectedTab = useSelector(({cartSlice: {uiState}}) => uiState.selectedTab);

    const active = tab === selectedTab ? "active" : ""
    const onTabChange = (tab) => {
        store.dispatch(cartSlice.actions.onTabChange({tab}))
    }

    return (
        <div
            className={`tab-item ${active}`}
            onClick={() => onTabChange(tab)}>
            {tab}
        </div>
    )
}

export default TabListItem;