import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import Link from "next/link";

export default function Account() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title="My Account" />
          <div className="inner-container mt-[75px] mb-[135px]">
            <div className="flex flex-row gap-[60px]">
              <MypageNav></MypageNav>
              <div className="grow mt-[17px]">
                <p className="text-2xl pb-4 border-b border-black">About Me</p>
                <table className="table-auto min-w-full">
                  <colgroup>
                    <col width="25%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr className="border-b border-[#757575]">
                      <th scope="row" className="text-lg bg-[#fefafa]">Personal Info</th>
                      <td>
                        <div className="flex flex-col">
                          <div className="flex items-center py-5 pl-5 justify-between border-b">
                            <p>Name<span className="text-[#ef426f]">*</span></p>
                            <div className="flex gap-[10px]">
                              <input type="text" placeholder="My" className="px-[10px] w-[220px] h-[50px] border rounded-[2px]" />
                              <input type="text" placeholder="Huyen" className="px-[10px] w-[220px] h-[50px] border rounded-[2px]" />
                            </div>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between">
                            <p>Date of Birth<span className="text-[#ef426f]">*</span></p>
                            <input type="datetime-local" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#757575]">
                      <th scope="row" className="text-lg bg-[#fefafa]">Change Password</th>
                      <td>
                        <div className="flex flex-col">
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Current Password<span className="text-[#ef426f]">*</span></p>
                            <input type="password" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                          <div className="py-5 pl-5 border-b">
                            <div className="flex items-center justify-between">
                              <p>New Password<span className="text-[#ef426f]">*</span></p>
                              <input type="password" className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                            </div>
                            <p className="pl-[162px] pt-1">Password Strength: No Password</p>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>Confirm New Password<span className="text-[#ef426f]">*</span></p>
                            <input type="password" className="shrink-0 px-[10px] w-[450px] h-[50px] border rounded-[2px]"></input>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end mt-[50px]">
                  <button className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
