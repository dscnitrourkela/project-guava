const user ={
    _id: "String",
    mail:"mail",
    name:"String",
    displayPicture:"String",
    firebaseId: "String",
    requests: [request._id],
    signs:[sign.id],
    certificates:[
        {
            certificateId:certificate._id,
            title:certificate.title,
            description:certificate.description,
        }
    ],
    createdAt:"datetime",
    updatedAt:"datetime",
    createdBy:"String", //Preferably userid / others
    updatedBy:"String", //Preferably userid / others
    schemaVersion:"Integer",
}

const request={
    _id:"String",
    initiater: user._id,
    title:"String",
    description:"String",
    status:"String/Integer",
    approvers:[
        {
            user: user._id,
            status: "Integer",
            pixel:["x","y"],
            scale:"Integer"
        }],
    certificateInfo:{
        template:"String",
        data: "String",
    },
    pixelMap:[{
        columnName:"ColumnName",
        pixel:["x","y"],
        fontSize:"Integer"
    }],
    font:"String",    
    createdAt:"datetime",
    updatedAt:"datetime",
    createdBy:"String", //Preferably userid / others
    updatedBy:"String", //Preferably userid / others
    schemaVersion:"Integer",
}

const certificate={
    _id="String",
    request: request.id,
    name: request.title,
    description: request.description,
    template: "String",
    pixelMap: [
        {
            value:"String",
            pixel:["x","y"],
            fontSize:"Integer"
    }],
    signMap:[{
        id:sign._id,
        pixel:["x","y"],
        scale:"Integer"
    }],
    createdAt:"datetime",
    updatedAt:"datetime",
    createdBy:"String", //Preferably userid / others
    updatedBy:"String", //Preferably userid / others
    schemaVersion:"Integer",
}

const sign={
    _id:"String",
    userId:user._id,
    name:"String",
    image:"String",
    designation:"String",
    createdAt:"datetime",
    updatedAt:"datetime",
    createdBy:"String", //Preferably userid / others
    updatedBy:"String", //Preferably userid / others
    schemaVersion:"Integer",
}