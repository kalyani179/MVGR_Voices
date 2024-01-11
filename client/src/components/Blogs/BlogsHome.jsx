import React from 'react'
import Animation from '../../common/Animation'
import InPageNavigation from './InPageNavigation'

const BlogsHome = () => {
    return (
        <Animation>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">
                        <InPageNavigation routes={["home","trending blogs"]}></InPageNavigation>
                </div>
                {/* filters and trending blogs */}
                <div>

                </div>
            </section>
        </Animation>
    )
}

export default BlogsHome