import { createSlice } from "@reduxjs/toolkit"
import cartActions, { getCombos, getTabOptionsList } from './actions';
import { OptionTabs } from "./../utils/enums/OptionTabs"

const TABS = [OptionTabs.Chips, OptionTabs.Drinks, OptionTabs.Chocolate]

const initialState = {
    combos: null,
    uiState: {
        loadingCombos: true,
        errorWhileLoadingCombos: null,
        optionSelectionError: null,
        tabs: TABS,
        selectedTab: TABS[0],
        options: [],
        selectedComboItems: {
            chips: null,
            drink: null,
            chocolate: null
        }
    }
}

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: cartActions,
    extraReducers: {
        [getCombos.pending]: (state, _) => {
            state.uiState.loadingCombos = true
        },
        [getCombos.rejected]: (state, { payload }) => {
            state.uiState.loadingCombos = false
            state.uiState.errorWhileLoadingCombos = payload
        },
        [getCombos.fulfilled]: (state, { payload }) => {
            state.combos = payload
            state.uiState.loadingCombos = false
            state.uiState.options = getTabOptionsList(
                state.uiState.selectedTab,
                state.uiState.selectedComboItems,
                state.combos
            );
        }
    }
})

export default cartSlice.reducer;