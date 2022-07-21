import { useSelector } from "react-redux";
import store from "../../../../app/Store";
import { cartSlice } from "../../store/slice";
import OptionListItem from "./OptionListItem"

function OptionList() {
    const options = useSelector(({cartSlice: {uiState}}) => uiState.options)
    const onOptionClick = (option) => {
        store.dispatch(cartSlice.actions.onOptionSelected(option))
    }
    return (
        <div className="option-list">
            {
                options.map(option => (
                    <OptionListItem key={option.name} option={option} onItemClick={onOptionClick}/>
                ))
            }
        </div>
    )
}

export default OptionList;