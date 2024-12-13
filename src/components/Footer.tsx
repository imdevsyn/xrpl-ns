export function Footer() {
  return (
    <div className="flex flex-col h-fit md:h-[180px] pt-0 md:pt-8 gap-4 justify-around md:justify-between md:flex-row w-full">
      <div className="w-[300px]">
        <h2 className="text-2xl font-semibold">XRPL Names</h2>
        <p>Empowering digital idenity for the XRP Ledger ecosystem.</p>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-[700px] justify-between items-start lg:items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 h-full items-start">
          <div className="flex flex-col text-[#5d636f]">
            <p className="text-black">ABOUT</p>
            <span>Blog</span>
          </div>
          <div className="flex flex-col text-[#5d636f]">
            <p className="text-black">DEVELOPERS</p>
            <span>Github</span>
          </div>
          <div className="flex flex-col text-[#5d636f]">
            <p className="text-black">SOCIAL</p>
            <span>Twitter</span>
          </div>
        </div>
        <div className="text-center my-6 text-[#5d636f]">
          &copy; 2024 XRPL Names Inc.
        </div>
      </div>
    </div>
  );
}
