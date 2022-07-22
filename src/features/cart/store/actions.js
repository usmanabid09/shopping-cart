import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetCombosService } from "../data/GetCombosService";
import { OptionTabs } from "../utils/enums/OptionTabs";
import { ResponseType } from "./../../../utils/ResponseResult";

export const getCombos = createAsyncThunk("cartSlice/getCombos", async (_, { rejectWithValue }) => {
    const result = await GetCombosService();
    // eslint-disable-next-line default-case
    switch (result.type) {
        case ResponseType.ERROR: {
            return rejectWithValue(result.errorMessage)
        }
        case ResponseType.SUCCESS: {
            return result.data;
        }
    }
});

export const getTabOptionsList = (tab, selectedCombo, data) => {
    switch (tab) {
        case OptionTabs.Chips: return data.chips;
        case OptionTabs.Drinks: return filterDrinkOptions(selectedCombo, data);
        case OptionTabs.Chocolate: return filterChocolateOptions(selectedCombo, data);
        default: return [];
    }
}

function filterDrinkOptions(selectedCombo, data) {
    const drinksAsKeyPairValue = data.drinks.reduce((previous, current) => {
        previous[current.id] = current;
        return previous
    }, {})
    const drinkOptions = data.combos
        .filter(({ chipsId }) => chipsId === selectedCombo.chips.id)
        .map(({ drinkId }) => drinksAsKeyPairValue[drinkId])
    return drinkOptions;
}

function filterChocolateOptions(selectedCombo, data) {
    const chocolatesAsKeyPairValue = data.chocolates.reduce((previous, current) => {
        previous[current.id] = current;
        return previous
    }, {})
    const chocolateOptions = data.combos
        .filter(({ chipsId, drinkId }) => chipsId === selectedCombo.chips.id && drinkId === selectedCombo.drink.id)
        .map(({ chocolateId }) => chocolatesAsKeyPairValue[chocolateId])
    return chocolateOptions;
}

function onTabChange(state, { payload: { tab } }) {
    if (tab === state.selectedTab) return;
    if (tab === OptionTabs.Drinks && state.uiState.selectedComboItems.chips === null) {
        state.uiState.optionSelectionError = "Please Select Chips First";
        return
    }
    if (tab === OptionTabs.Chocolate && state.uiState.selectedComboItems.drink === null) {
        state.uiState.optionSelectionError = "Please Select Drink First";
        return
    }
    state.uiState.selectedTab = tab;
    state.uiState.options = getTabOptionsList(state.uiState.selectedTab, state.uiState.selectedComboItems, state.combos);
}

function onOptionSelected(state, { payload }) {
    switch (state.uiState.selectedTab) {
        case OptionTabs.Chips: {
            state.uiState.selectedComboItems.chips = payload;
            state.uiState.selectedTab = OptionTabs.Drinks;
            state.uiState.options = getTabOptionsList(state.uiState.selectedTab, state.uiState.selectedComboItems, state.combos);
            return;
        }
        case OptionTabs.Drinks: {
            state.uiState.selectedComboItems.drink = payload;
            state.uiState.selectedTab = OptionTabs.Chocolate;
            state.uiState.options = getTabOptionsList(state.uiState.selectedTab, state.uiState.selectedComboItems, state.combos);
            return;
        }
        case OptionTabs.Chocolate: {
            state.uiState.selectedComboItems.chocolate = payload;
            return;
        }
        default: { }
    }
}

const cartActions = { onTabChange, onOptionSelected };

export default cartActions;