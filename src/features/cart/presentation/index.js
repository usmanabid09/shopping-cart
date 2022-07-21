import TabList from "./components/TabList"
import TabSection from "./components/TabSection"
import ErrorMessage from "./components/ErrorMessage"
import "./styles/cart.css";
import { useEffect } from "react";
import { getCombos } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import SelectedComboItems from "./components/SelectedComboItems";


function Cart() {
    const loading = useSelector(({cartSlice: {uiState}}) => uiState.loadingCombos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCombos())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    if(loading) return <div>Loading...</div>
    return <>
        <ErrorMessage/>
        <TabList/>
        <TabSection/>
        <SelectedComboItems/>
    </>
}

export default Cart;