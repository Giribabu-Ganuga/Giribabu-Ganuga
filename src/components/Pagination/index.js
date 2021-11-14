import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md'
import {BiFirstPage, BiLastPage} from 'react-icons/bi'
import './index.css'

const Pagination = props => {
  const {totalPagesCount, onChangePageNumber, activePage} = props
  const pagesList = [...Array(totalPagesCount).keys()]

  const onClickDeleteSelected = () => {
    const {deleteSelectedUserItems} = props
    deleteSelectedUserItems()
  }

  return (
    <div className="page-controls-container">
      <button
        type="button"
        onClick={onClickDeleteSelected}
        className="delete-selected-button"
      >
        Delete Selected
      </button>
      <button
        type="button"
        onClick={() => onChangePageNumber('FIRST')}
        className="navigate-first"
      >
        <BiFirstPage color="black" size={20} />
      </button>
      <button
        type="button"
        onClick={() => onChangePageNumber('PREVIOUS')}
        className="navigate-previous"
      >
        <MdNavigateBefore color="black" size={20} />
      </button>
      <ul className="page-numbers-container">
        {pagesList.map(eachNumber =>
          eachNumber + 1 === activePage ? (
            <li>
              <button
                type="button"
                onClick={() => onChangePageNumber(eachNumber + 1)}
                className="active-page-number-button"
              >
                {eachNumber + 1}
              </button>
            </li>
          ) : (
            <li>
              <button
                type="button"
                onClick={() => onChangePageNumber(eachNumber + 1)}
                className="page-number-button"
              >
                {eachNumber + 1}
              </button>
            </li>
          ),
        )}
      </ul>
      <button
        type="button"
        onClick={() => onChangePageNumber('NEXT')}
        className="navigate-next"
      >
        <MdNavigateNext color="black" size={20} />
      </button>
      <button
        type="button"
        onClick={() => onChangePageNumber('LAST')}
        className="navigate-last"
      >
        <BiLastPage color="black" size={20} />
      </button>
    </div>
  )
}

export default Pagination
