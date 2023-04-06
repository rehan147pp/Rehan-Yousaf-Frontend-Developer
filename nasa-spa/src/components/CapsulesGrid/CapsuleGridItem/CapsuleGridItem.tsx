import { useState } from "react";
import { Capsule } from "../../../interfaces/capsule.interface";
import CapsulePopup from "../CapsulePopup/CapsulePopup";


const CapsuleGridItem = (props: React.PropsWithChildren<{ capsule: Capsule }>) => {

  const [showModal, setShowModal] = useState(false);

  const { capsule } = props;
  return <><div onClick={() => setShowModal(true)} data-modal-target="popup-modal" data-modal-toggle="popup-modal"  className="border border-secondary h-96 rounded-xl p-1 px-2 hover:cursor-pointer hover:shadow-lg">
  <div className="h-fit w-full flex flex-col items-center justify-center gap-2 py-6">
    <img className='h-14 w-full' src='/rocket.svg' data-modal-target="popup-modal" data-modal-toggle="popup-modal" ></img>
    <p className="text-primary text-xl font-bold text-center">{capsule.type}</p>
    <p className="text-accent text-md font-medium text-center mt-1">{capsule.details}</p>
  </div>
  <div className="flex flex-col items-center justify-center gap-2 py-3">
    <div>
      <p className="text-primary text-sm font-light">Original Launch</p>
      <p className="text-accent text-xl font-medium"> {new Date(capsule.original_launch_unix).toLocaleDateString()}</p>
    </div>
    <div>
      <p className="text-primary text-sm font-light">Missions</p>
      <p className="text-accent text-xl font-medium text-center"> {capsule.missions.length}</p>
    </div>
  </div>
</div>
{showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded-lg w-full shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-full">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <img src='/rocket.svg' className="w-8 h-8 mr-5 h-full"></img><h3 className="text-3xl font-semibold">
                    <div>
                      <div>{capsule.type}</div>
                      <div className="text-sm text-accent">{capsule.capsule_serial}</div>
                    </div>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-primary h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-col w-96">
                    <div className="w-full mt-2">
                      <p className="text-md text-primary font-semibold">Details</p>
                      <p className="text-xl text-accent font-medium">{capsule.details}</p>
                    </div>
                    <div className="flex flex-row w-full justify-around">
                      <div className="w-full mt-2">
                        <p className="text-md text-primary font-semibold">Status</p>
                        <p className="text-xl text-accent font-medium">{capsule.status}</p>
                      </div>
                      <div className="w-full mt-2">
                        <p className="text-md text-primary font-semibold">Oirinal Launch</p>
                        <p className="text-xl text-accent font-medium">{new Date(capsule.original_launch_unix).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full justify-around">
                      <div className="w-full mt-2">
                        <p className="text-md text-primary font-semibold">Landings</p>
                        <p className="text-xl text-accent font-medium">{capsule.landings}</p>
                      </div>
                      <div className="w-full mt-2">
                        <p className="text-md text-primary font-semibold">Reuse Count</p>
                        <p className="text-xl text-accent font-medium">{capsule.reuse_count}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}</>
}

export default CapsuleGridItem;