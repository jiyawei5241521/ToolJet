import React, { useMemo } from 'react';
import Board from './Board';

const getData = (columns, cards) => {
  if (
    Object.prototype.toString.call(cards).slice(8, -1) === 'Array' &&
    Object.prototype.toString.call(columns).slice(8, -1) === 'Array'
  ) {
    const clonedColumns = [...columns];
    cards.forEach((card) => {
      const column = clonedColumns.find((column) => column.id === card.columnId);
      if (column) {
        column['cards'] = column?.cards ? [...column.cards, card] : [card];
      }
    });

    return clonedColumns;
  }
  return null;
};

export const BoardContext = React.createContext({});

export const KanbanBoard = ({ height, properties, styles, currentState, setExposedVariable }) => {
  const { columns, cardData, enableAddCard } = properties;

  const { visibility, disabledState, width, minWidth, accentColor } = styles;

  const boardData = useMemo(() => getData(columns, cardData), [columns, cardData]) ?? [];

  const updateExposedVariable = (data) => {
    setExposedVariable('data', data);
  };

  const colStyles = {
    width: !width ? '100%' : width,
    minWidth: !minWidth ? '350px' : minWidth,
  };

  if (boardData.length === 0) {
    return (
      <div className="mx-auto w-50 p-5 bg-light no-components-box" style={{ marginTop: '15%' }}>
        <center className="text-muted">Board is empty.</center>
      </div>
    );
  }

  return (
    <BoardContext.Provider value={{ currentState, enableAddCard, accentColor }}>
      <div style={{ display: visibility ? '' : 'none' }} data-disabled={disabledState} className="kanban-container p-0">
        <Board
          height={height}
          data={boardData}
          isDisable={disabledState}
          updateExposedVariable={updateExposedVariable}
          colStyles={colStyles}
        />
      </div>
    </BoardContext.Provider>
  );
};