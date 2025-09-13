  import { IoArrowBackCircleOutline } from "react-icons/io5";
  import { useNavigate, useParams } from "react-router-dom";
  import img1 from "../../../assets/pg1.jpg"
  import img2 from "../../../assets/pg2.jpg"
  import img3 from "../../../assets/pg3.jpg"
  import img4 from "../../../assets/img4.jpg"
  import img5 from "../../../assets/img5.jpg"
  import img6 from "../../../assets/img6.jpg"
  import { SlLocationPin } from "react-icons/sl";
  import { useState } from "react";
  import logo from "../../../assets/image.png";
  import veg from "../../../assets/veg.png";
  import { MdOutlineWatchLater } from "react-icons/md";
  import { GiChickenOven } from "react-icons/gi";
  function Details({users, setUsers}){

    const { id, listing } = useParams();
    console.log(listing);
      const navigate = useNavigate();
      // const { id } = useParams();

      const user =users.find((u)=>u.id ===parseInt(id))
      if (!user) {
        return (
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">Guest Details</h2>
            <p>No user data found for ID: {id}</p>
          </div>
        );
      }

      const address = user.address; 
      const parts = address.split(',');
      const area = parts.slice(0, 2).join(',').trim(); 
      const locality =parts[2]?.trim();


      const updateStatus =(newStatus)=>{
          setUsers((prevUser)=>prevUser.map((u)=>u.id ===user.id ?{...u ,status:newStatus} :u))
      }

      const [showPopup, setShowPopup] = useState(false);



      return(

          <div className="flex flex-col gap-6 font-inter">
              <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
                  <IoArrowBackCircleOutline className="w-[33.33px] h-[33.33px] cursor-pointer" 
                  onClick={()=>navigate(-1)}/>

                    <h2 className="text-[24px] font-medium leading-none">
                      Listing Management / PG or Hostel Listing / PG or Hostel Details
                  </h2>

              </div>

              <div className="bg-white px-4 py-4 flex flex-col gap-6 items-center rounded-[8px]">
                  <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow  flex flex-col gap-6 border border-[#A5A5A5]">
                      <div className="font-inter font-semibold text-[20px]">Approved Status: <span className={`${
                        user.status === "Approved"
                          ? "text-[#34C759]"
                          : user.status==="Pending" ?"text-[#FFCC00]":"text-[#FF383C]"
                      }`}>{user.status}</span>
                      </div>

                      {listing === "pglisting" && (<div className="w-full h-[245px]  flex justify-between gap-6">
                          
                          <div className="w-[326px] h-[245px] rounded-[16px] bg-blue-600 overflow-hidden ">
                              <img src={img1} alt="img1" className="w-full h-full object-cover" />
                          </div>
                          <div className="w-[326px] h-[245px] rounded-[16px] bg-blue-600 overflow-hidden">
                              <img src={img2} alt="img2" className="w-full h-full object-cover" />
                          </div>
                          <div className="w-[326px] h-[245px] rounded-[16px] bg-blue-600 overflow-hidden">
                              <img src={img3} alt="img3" className="w-full h-full object-cover" />
                          </div>
                        
                      </div>
                      )}

                      {listing ==="restaurantlisting" && (
                        
                      <div className="w-full h-[245px]  flex justify-between gap-6">
                          
                          <div className="w-[326px] h-[245px] rounded-[16px] bg-blue-600 overflow-hidden ">
                              <img src={img4} alt="img1" className="w-full h-full object-cover" />
                          </div>
                          <div className="w-[326px] h-[245px] rounded-[16px] bg-blue-600 overflow-hidden">
                              <img src={img5} alt="img2" className="w-full h-full object-cover" />
                          </div>
                          <div className="w-[326px] h-[245px] rounded-[16px] bg-blue-600 overflow-hidden">
                              <img src={img6} alt="img3" className="w-full h-full object-cover" />
                          </div>
                        
                      </div>
                      )}

                      {listing ==="pglisting" &&( <div className="w-full min-h-[315px] flex flex-col gap-4">
                          <div className="font-inter font-semibold text-[24px]">{user.name}</div>

                          <div className="w-full h-[25px] flex gap-2">
                              <div className="flex items-center justify-center min-w-[104px] min-h-[25px] rounded-[35px] px-3 py-1 bg-[#5E9BED] font-medium text-[14px] text-white">{user.type}</div>
                              <div className="font-medium text-[14px] text-[#666060] flex items-center justify-center gap-1"><SlLocationPin className="w-4 h-4" /> {locality}</div>
                          </div>  

                          <div className="font-medium text-[14px] text-[#666060] min-h-[17px]">{area}</div>
                          <div className=" min-h-[22px] flex gap-3">
                              <div className="font-medium text-[14px] text-[#666060]">Total Rooms: <span className="font-medium text-[14px] text-black">{user.troom}</span></div>
                              <div className="font-medium text-[14px] text-[#666060]">Total Bed <span className="font-medium text-[14px] text-black">{user.tbed}</span></div>
                          </div>

                          <p className="font-medium text-[16px] text-[#666060]">{user.description}</p>

                          <div className="min-h-[135px] bg-[#F5F5F5] p-4 rounded-[12px] flex justify-between items-center ">
                              <div className="flex flex-col gap-2">
                                  <div className="font-medium text-[16px] text-[#666060] text-base leading-[1.2]" >₹{user.priceDay}/day</div>
                                  <div className="font-medium text-[16px] text-[#666060] text-base leading-[1.2]" >₹{user.priceWeekly}/week</div>
                                  <div className="font-semibold text-[20px] text-[#004AAD] text-base leading-[1.2]" >₹{user.priceMonthly}/month</div>
                                  <p className="font-medium text-[14px] text-[#666060]">Note: You have to pay security deposit of ₹{user.securityDeposit} on monthly booking. It will be refunded to you on check-out.</p>
                              </div>  

                              <div className="min-w-[91px] min-h-[33px] rounded-[50px] px-4 py-2 bg-[#3A88FE] text-white font-medium text-[14px] text-white">{user.offer}% OFF</div>
                          </div>
                      </div>
                      )}

                      {listing ==="restaurantlisting" && (<div className="w-full min-h-[315px] flex flex-col gap-4">
                          <div className="font-inter font-semibold text-[24px]">{user.name}</div>
                          <p className="font-medium text-[16px] text-[#666060]">{user.description}</p>

                          <div className="w-full h-[25px] flex gap-2 items-center">
                              {user.foodType?.split(',').map((type, index) => {
  const trimmedType = type.trim().toLowerCase(); // normalize case

  const isVeg = trimmedType === 'veg';

  return (
    <div
      key={index}
      className={`flex items-center justify-center gap-2 min-w-[90px] min-h-[28px] 
        rounded-[35px] px-3 py-1
        ${isVeg ? 'bg-[#1DB435]' : 'bg-[#FF383C]'}
        font-medium text-[14px] text-white`}
    >
      <img
        src={isVeg ? veg : <GiChickenOven />}
        alt={isVeg ? "Veg" : "Non-Veg"}
        className="w-[16px] h-[16px]"
      />
      {isVeg ? 'Veg' : 'Non-Veg'}
    </div>
  );
})}

                              <div className="font-medium text-[14px] text-[#666060] flex items-center justify-center gap-1"><SlLocationPin className="w-4 h-4" /> {locality}</div>
                              <div className="font-medium text-[14px] text-[#666060] flex items-center justify-center gap-1"><MdOutlineWatchLater className="w-4 h-4" />  {user.startTime} - {user.endTime}</div>
                          </div>    

                          <div className="min-h-[135px] bg-[#F5F5F5] p-4 rounded-[12px] flex justify-between items-center ">
                              <div className="w-full flex flex-col gap-2">
                                  <div className="font-semibold font-inter text-[20px] text-[#004AAD]">With One Meal (Veg) </div>
                                  <div className="flex justify-between ">
                                    {user.orderType?.split(",").map((type, index) => {
        const trimmedType = type.trim();
        return (
          <div key={index} className="flex flex-col gap-2">
            <div className="font-medium text-[14px] text-[#666060] leading-[100%] align-middle">
              {trimmedType} ₹120/day
            </div>
            <div className="font-medium text-[14px] text-[#666060] leading-[100%] align-middle">
              {trimmedType} ₹800/week
            </div>
            <div className="font-medium text-[14px] text-[#666060] leading-[100%] align-middle">
              {trimmedType} ₹3200/month
            </div>
          </div>
        );
      })}

                                    <div className="flex items-center justify-center">
                                    <div className="min-w-[91px] min-h-[33px] rounded-[50px] px-4 py-2 bg-[#3A88FE] text-white font-medium text-[14px] text-white">{user.offer}% OFF</div>
                                    </div>
                                  </div>
                                 
                              </div>  

                              
                          </div>
                      </div>)}
                  </div>
                      

                <div className="flex gap-4">
                      <button onClick={()=>{updateStatus("Rejected"); setShowPopup(true)}} className="w-[200px] h-[40px] rounded-[8px] border border-[#004AAD] text-[#004AAD]">Reject</button>
                      <button onClick={()=>{updateStatus("Approved"); setShowPopup(true)}} className="w-[200px] h-[40px] rounded-[8px] bg-[#004AAD] text-white">Approve</button>
                </div>

                  {/* {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-green-600">
                ✅ Successfully Approved!
              </h2>
              <p className="mt-2 text-gray-600">
                The listing has been approved successfully.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 px-6 py-2 bg-[#004AAD] text-white rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        )} */}
                {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40" onClick={()=>setShowPopup(false)}>
                          <div className="bg-white rounded-lg shadow-lg p-6 w-[360px]  flex flex-col gap-2  items-center">
                            <img src={logo} alt="" className="w-[246px] h-[56px] "/>  
                            <h2 className={`text-[24px] font-semibold ${user.status==="Rejected"?"text-[#FF383C]":"text-[#34C759]"}`}>{user.status==="Rejected" ? "Rejected!" : "Approved!"}</h2>
                            <p className="text-[#666060] text-[16px] font-inter  font-semibold text-center ">
                              {user.status === "Rejected"
                                ? "You have successfully rejected."
                                : "You have successfully approved."}
                            </p>
                            
                          </div>
                        </div>
                      )}
              </div>
          </div>

      )
  }

  export default Details;