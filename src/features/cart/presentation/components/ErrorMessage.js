import { useSelector } from "react-redux"

function ErrorMessage() {
    const listError = useSelector(({cartSlice: {uiState}}) => uiState.errorWhileLoadingCombos)
    const optionError = useSelector(({cartSlice: {uiState}}) => uiState.optionSelectionError)

    if(listError === null && optionError === null) return <></>
    return <div className="error">{listError || optionError}</div>
}

export default ErrorMessage;