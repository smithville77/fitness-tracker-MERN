import React, { useEffect, useState } from "react";


function ProfileSkeleton() {
  return (
    <div className="Profile">
      <div id="grid-container-skeleton">
        <div id="greet-skeleton" className="shimmerBG"></div>
        <div id="daily-data-skeleton">
          <div className="square-skeleton shimmerBG">
            <div className="inner-div-skeleton "></div>
          </div>
          <div className="square-skeleton shimmerBG">
            <div className="inner-div-skeleton"></div>
          </div>

          <div className="square-skeleton shimmerBG">
            <div className="inner-div-skeleton"></div>
          </div>

          <div className="square-skeleton shimmerBG">
            <div className="inner-div-skeleton"></div>
          </div>
        </div>

        <div id="recent-data-skeleton">
          <div className="square-skeleton shimmerBG">
            <div className="recent-runs-skeleton"></div>
          </div>

          <div className="square-skeleton shimmerBG">
            <div className="recent-runs-skeleton"></div>
          </div>

          <div className="square-skeleton shimmerBG">
            <div id="outer-container-skeleton">
              <div id="top-badges-container-skeleton"></div>
            </div>
          </div>
        </div>

        <div id="sidebar-skeleton">
          <div className="recent-exercise-skeleton shimmerBG"></div>
          <div className="recent-exercise-skeleton shimmerBG"></div>
          <div className="recent-exercise-skeleton shimmerBG"></div>
          <div className="recent-exercise-skeleton shimmerBG"></div>
          <div className="recent-exercise-skeleton shimmerBG"></div>
          <div className="recent-exercise-skeleton shimmerBG"></div>
          <div className="recent-exercise-skeleton shimmerBG"></div>
          <div className="recent-exercise-skeleton shimmerBG"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
