"use client";
import {useState, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LabelInputContainer } from "@/components/ui/label-input-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

 
export default function CreateAgent() {

    interface FormData {
        sessionName: string;
        typeOfInterview: string;
        context: string;
        files: File[];
    }

    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        sessionName: "",
        typeOfInterview: "conversational",
        context: "",
        files: [],
    });
    const [fileName, setFileName] = useState<string | null>(null);
    const isDisabled = formData.context === "" || formData.sessionName === "";
    const API = "http://127.0.0.1:5000/pairapi"; // should put this in env file

    // Functions
    const handleFileUpload = () => {
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput.files) {
            const file = fileInput.files[0];
            setFormData({...formData, files: [...formData.files, file]});
        }

        // clear the file input
        fileInput.value = "";
        setFileName(null);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileName(file ? file.name : null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData(); // have to do formdata object to send multipart form data
        formDataToSend.append("sessionName", formData.sessionName);
        formDataToSend.append("typeOfInterview", formData.typeOfInterview);
        formDataToSend.append("context", formData.context);

        formData.files.forEach(file => {
            formDataToSend.append("files", file);
        });

        try {
            const response = await axios.post(`${API}/create-agent`, formDataToSend);
            console.log("Generated session:", response.data);
            router.push(`/sessions/${response.data.sessionId}`, {
                state: { sessionName: formData.sessionName },
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex min-h-screen w-full justify-center items-center mt-16">
            <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border ">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Create an Interview Agent
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Fill in the appropriate details to create an interview agent
                </p>
            
                <form className="mt-8 flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
                    <LabelInputContainer>
                        <Label htmlFor="session-name">Session Name</Label>
                        <Input id="session-name" placeholder="FaGooFlix Interview" autoComplete="off" type="text" onChange={(e) => setFormData({...formData, sessionName: e.target.value})} value={formData.sessionName}/>
                    </LabelInputContainer>
                    <LabelInputContainer className="">
                    <Label htmlFor="type-of-interivew">Type of Interview</Label>
                    <Select onValueChange={(type) => setFormData({...formData, typeOfInterview: type})} value={formData.typeOfInterview}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Conversational" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="conversational">Conversational</SelectItem>
                            <SelectItem value="behavioral">Behavioral</SelectItem>
                            <SelectItem value="system">System Design</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                    </Select>
                    </LabelInputContainer>
                    <LabelInputContainer className="">
                        <Label htmlFor="context">Context</Label>
                        <Textarea required id="context" placeholder="I am interviewing for a Software Engineer Intern position at FaGooFlix" value={formData.context} onChange={(e) => setFormData({...formData, context: e.target.value})}/>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="file-upload">Upload Files</Label>
                        <div className="relative flex w-full items-center gap-2 justify-between rounded-md p-2 shadow-sm bg-gray-50 dark:bg-zinc-800">
                            <input
                            id="file-upload"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.md,.html,image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <span className={fileName ? `text-white text-sm truncate` : `text-zinc-500 text-sm`}>
                            {fileName || "Upload or Browse Files"}
                            </span>
                            
                            <Button type="button" className={`relative z-20 ${!fileName ? 'cursor-not-allowed opacity-50 hover:bg-white' : 'cursor-pointer'}`} onClick={handleFileUpload} aria-disabled={!fileName}>
                                <FontAwesomeIcon icon={faArrowUp} className="fa-fw" />
                            </Button>
                        </div>
                    </LabelInputContainer>
                    <div className="flex justify-center items-center w-full gap-2 flex-col">
                        {formData.files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 w-full border rounded-md p-2">
                                <span className="text-neutral-600 dark:text-neutral-300 text-sm truncate w-full">{file.name}</span>
                                {/* remove file based on index */}
                                <Button type="button" variant="destructive" onClick={() => setFormData({...formData, files: formData.files.filter((_, i) => i !== index)})}><FontAwesomeIcon icon={faTrash} /></Button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
            
                    <button
                        className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${
                            isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                        }`}
                        type="submit"
                        disabled={isDisabled}
                        >
                        Create &rarr;
                        {!isDisabled && <BottomGradient />}
                    </button>
                </form>
            </div>
        </div>
    );
}
 
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
    </>
  );
};