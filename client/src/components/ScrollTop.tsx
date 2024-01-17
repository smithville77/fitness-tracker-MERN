import React from "react";

function ScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      id="scroll-top"
      className="fixed bottom-20 right-10 h-10 w-10 rounded-full bg-orange-500 text-2xl flex justify-center items-center"
      onClick={scrollToTop}
    >
      <p className="flex justify-center items-center mt-2">⌃</p>
    </button>
  );
}

export default ScrollTop;
