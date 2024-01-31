import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";

export default function MyAddresses() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title1="My Account" title2="My Addresses" />
          <div className="inner-container mt-[75px] mb-[135px]">
            <div className="flex flex-row gap-[60px]">
              <MypageNav></MypageNav>
              <div className="grow mt-[17px]">
                <p className="text-2xl pb-4 border-b border-black">My Addresses</p>
                <table className="table-auto min-w-full">
                  <colgroup>
                    <col width="25%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr className="border-b border-[#757575]">
                      <th scope="row" className="text-lg bg-[#fefafa]">Add New Address</th>
                      <td>
                        <div className="flex flex-col">
                          <div className="flex items-center py-5 pl-5 justify-between border-b">
                            <p>Name<span className="text-[#ef426f]">*</span></p>
                            <div className="flex gap-[10px]">
                              <input type="text" placeholder="My" className="px-[10px] w-[220px] h-[50px] border rounded-[2px]" />
                              <input type="text" placeholder="Huyen" className="px-[10px] w-[220px] h-[50px] border rounded-[2px]" />
                            </div>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Phone Number<span className="text-[#ef426f]">*</span></p>
                            <input type="tel" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Company Name</p>
                            <input type="text" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Street Address<span className="text-[#ef426f]">*</span></p>
                            <input type="text" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Suburb/City</p>
                            <input type="text" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>State/Province</p>
                            <input type="text" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Zip/Postal Code</p>
                            <input type="text" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Country</p>
                            <input type="text" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end mt-[50px] gap-[10px]">
                  <button className="w-[220px] h-[60px] rounded bg-[#cccccc] text-lg">Cancel</button>
                  <button className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
