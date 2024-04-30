import React from 'react';
import './Folder-Background.css'

export function FolderBackground() : JSX.Element {
    return (
    <div className="manilla-folder">
      <div className="tabs">
    <button className="tab-button" data-table="table-1">Tab 1</button>
    <button className="tab-button" data-table="table-2">Tab 2</button>
    <button className="tab-button" data-table="table-3">Tab 3</button>
    <button className="tab-button" data-table="table-4">Tab 4</button>
  </div>
  <div id="table-1" className="table-container">
  </div>
  <div id="table-2" className="table-container">
  </div>
  <div id="table-3" className="table-container">
  </div>
  <div id="table-4" className="table-container">
  </div>
</div>
    )
}

