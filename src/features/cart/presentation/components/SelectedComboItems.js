import { useSelector } from "react-redux";

function SelectedComboItems() {
    const selectedCombo = useSelector(({cartSlice: {uiState}}) => uiState.selectedComboItems);

    if(selectedCombo.chips === null) return <></>

    return (
        <div className="selected-combo-list">
            <div>Selected Combo Items: </div>
            {selectedCombo.chips && <div className="selected-combo-list-item">{selectedCombo.chips.name}</div>}
            {selectedCombo.drink && <div className="selected-combo-list-item">{selectedCombo.drink.name}</div>}
            {selectedCombo.chocolate && <div className="selected-combo-list-item">{selectedCombo.chocolate.name}</div>}
        </div>
    )
}

export default SelectedComboItems;