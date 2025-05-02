"use client"

import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/auth"
import React, { useState } from 'react'

const LogoutButton = () => {
    const [ isLoggingOut, setIsLoggingOut ] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)

        try {
            await logout()
        } catch (error) {
            console.error('ログアウトエラー', error)
            setIsLoggingOut(false)
        }
    }

    return (
        <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogout}
        disabled={isLoggingOut}
        >
        {isLoggingOut ? 'ログアウト中...' : 'ログアウト'}
        </Button>
    )
}

export default LogoutButton