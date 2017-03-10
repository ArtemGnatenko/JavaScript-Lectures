(function () {
    var TODO_List = app.getModule("TODOList");
    $("h1").after(TODO_List.createTODOList([
        {
            name: "asadsad asdas ",
            email: "asdasd@asdaf.ds",
            assigned: false,
            assignedTo: []
        },
        {
            name: "sarggfhf gh fgh",
            email: "asd2ASD@asd.ds",
            assigned: false,
            assignedTo: []
        },
        {
            name: "asd1 12 312",
            email: "asdkjash@asd.aadsd",
            assigned: false,
            assignedTo: []
        },
        {
            name: "asd 1231 ",
            email: "lkajf@asdfsd.sa",
            assigned: false,
            assignedTo: []
        },
        {
            name: "13214 234 324 ",
            email: "ad@dsa.asd",
            assigned: false,
            assignedTo: []
        }
    ],[
        {
            title: "asd 1",
            description: "asdasdas asdsadasd asd as ",
            id: "asda d1231",
            active: false,
            createDate: new Date(2000, 1, 1),
            completed: false,
            assignedTo: []
        },
        {
            title: "asd 2",
            description: "asd asdas dsad asdasd",
            id: "assa das123",
            active: false,
            createDate: new Date(2100, 1, 1),
            completed: false,
            assignedTo: []
        },
        {
            title: "asd 3",
            description: "asd asdsad asd ",
            id: "asdasd 2",
            createDate: new Date(1900, 1, 1),
            active: false,
            completed: false,
            assignedTo: []
        },
        {
            title: "asd 4",
            description: "asd asdsa sad sad asds",
            id: "sad 1",
            active: false,
            createDate: new Date(1800, 1, 1),
            completed: false,
            assignedTo: []
        }
    ]));


})();