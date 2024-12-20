import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const PostListingPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axiosInstance.get("/posts");
            setPosts(response.data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            {posts.map((post) => (
                <div key={post._id} className="p-4 border rounded mb-4">
                    <h2 className="font-bold">{post.title}</h2>
                    <p>{post.content}</p>
                    <p className="text-gray-500">{post.likes} Likes</p>
                </div>
            ))}
        </div>
    );
};

export default PostListingPage;
