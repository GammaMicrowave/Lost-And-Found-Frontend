import img1 from "../../../assets/Upload.svg";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FileUploader } from "react-drag-drop-files";
import img2 from "../../../assets/illustrations/homepage2.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import Dropdown from "./../../../components/interfaces/Dropdown/Dropdown";
import Footer from "../../../components/interfaces/Footer/index";
import Navbar2 from "../../../components/interfaces/Navbar2";
import SEO from "../../../components/utils/SEO";
import { DatePicker } from "antd";
import { DatePickRef } from "antd/lib/date-picker/generatePicker/interface";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function lost_form() {
    const [file, setFile] = useState(null),
        [fileDataURL, setFileDataURL] = useState(null);

    const title = useRef(null),
        description = useRef(null),
        location = useRef(null),
        phone = useRef(null),
        email = useRef(null);

    const handleChange = (file) => {
        setFile(file);
    };

    function remove() {
        setFile(null);
    }

    async function submit() {
        let data = new FormData();
        data["image"] = file;
        let res = await post("/uploadimage", data);
        if (res) {
            let url = res.data?.url;
            if (url) {
                let body = {};
            }
        }
    }

    useEffect(() => {
        let fileReader,
            isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);
    const onChange = (value, dateString) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
    };
    const onOk = (value) => {
        console.log("onOk: ", value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <SEO title="Lost / Lost&Found" />
            <Navbar2 />
            <div className="h-screen flex">
                <div className="flex flex-col w-screen justify-center items-center self-center my-auto">
                    <h1 className="font-semibold text-5xl mb-10 text-[#304AC1]">
                        Add Lost Item
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="text-sm box-border h-11 w-96 border-2 border-solid border-slate-400 rounded-md mb-5 flex align-middle bg-[#EBEFFA] pl-3">
                            <input
                                type="text"
                                placeholder="Title"
                                className="bg-transparent"
                                ref={title}
                                required={true}
                            />
                        </div>
                        <div className="text-sm box-border py-2 w-96 border-2 border-solid border-slate-400 rounded-md mb-5 flex align-middle bg-[#EBEFFA] pr-3">
                            <Dropdown />
                        </div>
                        <div className="text-sm box-border h-11 w-96 border-2 border-solid border-slate-400 rounded-md mb-5 flex align-middle bg-[#EBEFFA] pl-3">
                            <DatePicker
                                showTime
                                onChange={onChange}
                                onOk={onOk}
                                showToday={true}
                            />
                        </div>
                        <textarea
                            className="text-sm box-border pt-3 pr-3 h-36 w-96 border-2 border-solid border-slate-400 rounded-md mb-5 flex align-middle bg-[#EBEFFA] pl-3 "
                            placeholder="Description..."
                            ref={description}
                        ></textarea>
                        <div className="text-sm box-border h-11 w-96 border-2 border-solid border-slate-400 rounded-md mb-5 flex align-middle bg-[#EBEFFA] pl-3">
                            <input
                                className="bg-transparent"
                                type="text"
                                placeholder="Location"
                                ref={location}
                                required={true}
                            />
                        </div>
                        <div className="text-sm box-border h-11 w-96 border-2 border-solid border-slate-400 rounded-md mb-5 flex align-middle bg-[#EBEFFA] pl-3">
                            <input
                                className="bg-transparent"
                                type="text"
                                placeholder="Phone Number"
                                ref={phone}
                                pattern="[0-9]+$"
                                required={true}
                            />
                        </div>
                        <div className="text-sm box-border h-11 w-96 border-2 border-solid border-slate-400 rounded-md mb-5 flex align-middle bg-[#EBEFFA] pl-3">
                            <input
                                className="bg-transparent"
                                type="email"
                                placeholder="Email"
                                ref={email}
                            />
                        </div>
                        {file === null ? (
                            <div
                                className="text-sm box-border flex items-center justify-center flex-wrap flex-col w-96 border-2 border-solid border-slate-400 rounded-md mb-5 bg-[#EBEFFA] pl-3 pr-3"
                                style={{ position: "relative" }}
                            >
                                <div>
                                    <div className="text-center w-full text-base opacity-40">
                                        Add Image
                                    </div>
                                    <div className=" text-center w-full scale-75 opacity-40">
                                        <Image src={img1} className="" />
                                    </div>

                                    <div className="text-center w-full text-xs opacity-40 ">
                                        Drag or drop or browse a file
                                    </div>
                                </div>
                                <div
                                    style={{
                                        opacity: 0,
                                        position: "absolute",
                                    }}
                                >
                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div
                                className="text-sm box-border flex py-4 pt-6 items-center justify-center flex-wrap flex-col w-96 border-2 border-solid border-slate-400 rounded-md mb-5 bg-[#EBEFFA] pl-3 pr-3"
                                style={{ position: "relative" }}
                            >
                                <div
                                    className=""
                                    style={{
                                        width: "50%",
                                        position: "relative",
                                    }}
                                >
                                    <img src={fileDataURL} alt="preview" />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "-15px",
                                            right: "-15px",
                                        }}
                                        onClick={remove}
                                    >
                                        <IoCloseCircleOutline />
                                    </div>
                                </div>
                            </div>
                        )}
                        <button
                            className="bg-[#304AC1] text-[#EBEFFA] h-11 w-96 rounded-md select-none"
                            type="submit"
                            onClick={submit}
                        >
                            Add Lost Item
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
