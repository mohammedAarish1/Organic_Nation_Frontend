import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const apiUrl = import.meta.env.VITE_BACKEND_URL;

const BlogDetail = () => {

    const dispatch = useDispatch()
    const [singleBlog, setSingleBlog] = useState({});
    const { recentBlogs } = useSelector(state => state.blog)
    const { titleUrl } = useParams()
    const getSingleBlog = async (titleUrl) => {

        try {
            const response = await axios.get(`${apiUrl}/api/blogs/${titleUrl}`);
            if (response.status === 200) {
                setSingleBlog(response.data)
            }
        } catch (error) {
            throw error
        }
    }


    useEffect(() => {
        getSingleBlog(titleUrl)
    }, [titleUrl, dispatch])

    return (
        <div>

            <main className='relative bg-[var(--background-color)] '>
                <img className="h-96 w-full object-cover" src={singleBlog.image} alt="" />
                <article className="mx-auto max-w-screen-lg rounded-t-lg bg-white  shadow-lg -translate-y-32 pt-5">
                    <div>
                        <div className='text-center'>
                            <p className="text-gray-500">Published on {new Date(singleBlog?.date).toDateString()}</p>
                            <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-3xl ">{singleBlog.title}</h1>
                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                                {singleBlog.tags?.map(tag => (
                                    <button key={tag} className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">#{tag}</button>
                                ))}
                            </div>
                        </div>


                        <div
                            className="mx-auto max-w-screen-lg space-y-12 rounded-b-lg px-8 pt-10 pb-20 sm:text-lg tracking-wide  sm:shadow-lg text-sm">
                            <ReactMarkdown>{singleBlog.description?.replace(/\\n/g, '\n')}</ReactMarkdown>
                        </div>
                    </div>
                </article>
            </main>

            <div className="w-fit mx-auto flex space-x-2">
                <div className="h-0.5 w-2 bg-gray-600"></div>
                <div className="h-0.5 w-32 bg-gray-600"></div>
                <div className="h-0.5 w-2 bg-gray-600"></div>
            </div>

            <aside aria-label="Recent Posts" className="mx-auto mt-10 max-w-screen-xl py-20">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    {/* <!-- Heading --> */}
                    <div className="mb-10 md:mb-16">
                        <h2 className=" text-center text-2xl font-bold text-gray-800 md:mb-1 lg:text-3xl">Most Recent Posts</h2>
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Find out the most recent posts</p>
                    </div>
                    {/* <!-- /Heading --> */}
                    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">


                        {recentBlogs.map(recentBlog => (
                            <article key={recentBlog._id} className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                                <Link to={`/blogs/${recentBlog._id}`} className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                                    <img src={recentBlog.image} loading="lazy" alt="" className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-500 " />
                                </Link>

                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-400">{new Date(recentBlog?.date).toDateString()}</span>

                                    <h2 className="text-xl font-bold text-gray-800">
                                        <p className="active:text-rose-600 transition duration-100 hover:text-rose-500">{recentBlog.title}</p>
                                    </h2>

                                    {/* <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p> */}

                                    <div>
                                        <Link to={`/blogs/${recentBlog['title-url']}`} className="active:text-rose-700 font-semibold text-[var(--themeColor)] transition duration-100 hover:text-rose-600">Read more</Link>
                                    </div>
                                </div>
                            </article>
                        ))}






                    </div>
                </div>
            </aside>

        </div>
    )
}

export default BlogDetail;

