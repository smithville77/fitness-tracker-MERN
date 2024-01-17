import React from "react";

function RunDisplaySkeleton() {
  return (
    <div className="run-display-skeleton">
      <div id="run-display-grid-container-skeleton">
        <div id="left-section-skeleton">
          <div className="run-entry shimmerBG"></div>
          <div className="run-entry shimmerBG"></div>
          <div className="run-entry shimmerBG"></div>
          <div className="run-entry shimmerBG"></div>
          <div className="run-entry shimmerBG"></div>
          <div className="run-entry shimmerBG"></div>
          <div className="run-entry shimmerBG"></div>
        </div>
        <div id="display-container-skeleton">
          <div id="depth-sidebar-skeleton">
            <div id="filter-data-section-skeleton"></div>
            <div id="stats-container-skeleton" className="shimmerBG"></div>

            <div
              id="weekly-goals-container-skeleton"
              className="shimmerBG"
            ></div>

            <div id="map-container-skeleton" className="shimmerBG"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RunDisplaySkeleton;
