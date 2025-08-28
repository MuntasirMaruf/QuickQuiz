"use client";
import {use} from "react";

export default function page({params}: {params: Promise<{username: string}>}) {
    const {username} = use(params);
    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2>Hi {username} </h2>
        <br/>
        <br/>
        <br/>
        <br/>
        </>
    );
}