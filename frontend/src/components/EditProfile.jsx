
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '../redux/authSlice';

const EditProfile = () => {
    const imageRef = useRef();
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePhoto: file });
    }

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }


    const editProfileHandler = async () => {
        console.log(input);
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if(input.profilePhoto){
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/v1/user/profile/edit', formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                const updatedUserData = {
                    ...user,
                    bio:res.data.user?.bio,
                    profilePicture:res.data.user?.profilePicture,
                    gender:res.data.user.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.messasge);
        } finally{
            setLoading(false);
        }
    }
    return (
<div className="flex max-w-4xl mx-auto pl-10 py-6">
  <section className="flex flex-col gap-8 w-full my-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-8 rounded-xl shadow-xl">
    <h1 className="font-bold text-3xl text-white mb-6 text-center">Edit Profile</h1>
    
    <div className="flex items-center justify-between bg-gray-700 rounded-xl p-6 mb-6 hover:bg-gray-600 transition-all duration-300">
      <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src={user?.profilePicture} alt="profile_image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold text-2xl">{user?.username}</h1>
          <span className="text-gray-400">{user?.bio || 'No bio added'}</span>
        </div>
      </div>
      <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" />
      <Button onClick={() => imageRef?.current.click()} className="bg-[#0095F6] text-white hover:bg-[#318bc7] px-4 py-2 rounded-lg shadow-md transition-all">
        Change Photo
      </Button>
    </div>

    <div>
      <h1 className="font-semibold text-2xl text-white mb-3">Bio</h1>
      <Textarea
        value={input.bio}
        onChange={(e) => setInput({ ...input, bio: e.target.value })}
        name="bio"
        className="bg-gray-800 text-white border-gray-600 focus:ring-2 focus:ring-[#0095F6] p-4 rounded-md w-full transition-all"
        placeholder="Write your bio..."
      />
    </div>

    <div className="mt-6">
      <h1 className="font-semibold text-2xl text-white mb-3">Gender</h1>
      <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
        <SelectTrigger className="w-full bg-gray-800 text-white border-gray-600 rounded-md p-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white">
          <SelectGroup>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div className="flex justify-end mt-6">
      {
        loading ? (
          <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd] text-white px-8 py-3 rounded-md shadow-lg flex items-center justify-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button onClick={editProfileHandler} className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd] text-white px-8 py-3 rounded-md shadow-lg transition-all">
            Submit
          </Button>
        )
      }
    </div>
  </section>
</div>


    )
}

export default EditProfile
