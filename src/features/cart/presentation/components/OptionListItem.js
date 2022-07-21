function OptionListItem({option, onItemClick}) {
    return <div className="option-list-item" onClick={() => onItemClick(option)}>{option.name}</div>
}

export default OptionListItem;