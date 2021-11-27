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
    <div className="pagination-container">
      <div>
        <button
          type="button"
          onClick={onClickDeleteSelected}
          className="delete-selected-button"
        >
          Delete Selected
        </button>
      </div>
      <div className="page-controls-container">
        <button
          type="button"
          onClick={() => onChangePageNumber('FIRST')}
          className="navigate-button"
        >
          <BiFirstPage color="black" size={20} />
        </button>
        <button
          type="button"
          onClick={() => onChangePageNumber('PREVIOUS')}
          className="navigate-button"
        >
          <MdNavigateBefore color="black" size={20} />
        </button>
        <ul className="page-numbers-container">
          {pagesList.map(eachNumber =>
            eachNumber + 1 === activePage ? (
              <li key={eachNumber}>
                <button
                  type="button"
                  onClick={() => onChangePageNumber(eachNumber + 1)}
                  className="navigate-button active-page-number-button"
                >
                  {eachNumber + 1}
                </button>
              </li>
            ) : (
              <li key={eachNumber}>
                <button
                  type="button"
                  onClick={() => onChangePageNumber(eachNumber + 1)}
                  className="navigate-button page-number-button"
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
          className="navigate-button"
        >
          <MdNavigateNext color="black" size={20} />
        </button>
        <button
          type="button"
          onClick={() => onChangePageNumber('LAST')}
          className="navigate-button"
        >
          <BiLastPage color="black" size={20} />
        </button>
      </div>
    </div>
  )
}

export default Pagination
