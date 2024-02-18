import React from 'react'
import Banner from '../Banner/Banner'
import DisplayImages from './DisplayImages'

const Dashboard = () => {
    return (
        <div className=' h-full flex flex-col gap-10 p-5'>
            <Banner />
            <DisplayImages />
        </div>
    )
}

export default Dashboard