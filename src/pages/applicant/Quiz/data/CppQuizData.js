export const CppQuizData = [
    {
        question: "What is NOT a valid data type in C++?",
        options: [
            "int",
            "float",
            "char",
            "string"
        ],
        answer: 4
    },
    {
        question: "Which operator is used to allocate memory dynamically in C++?",
        options: [
            "new",
            "malloc",
            "alloc",
            "allocate"
        ],
        answer: 1
    },
    {
        question: "What is the output of the following code?\n```cpp\nint x = 5;\nint& y = x;\ny = 10;\nstd::cout << x;\n```",
        options: [
            "5",
            "10",
            "0",
            "Error"
        ],
        answer: 2
    },
    {
        question: "What does the `endl` manipulator do in C++?",
        options: [
            "Ends the program",
            "Ends the current line and moves to the next",
            "Ends the current line",
            "Ends the loop"
        ],
        answer: 2
    },
    {
        question: "Which of the following is NOT a valid way to declare a pointer in C++?",
        options: [
            "int* ptr;",
            "int *ptr;",
            "int * ptr;",
            "int ptr;"
        ],
        answer: 4
    },
    {
        question: "What is the output of the following code?\n```cpp\nint x = 5;\nint* ptr = &x;\nstd::cout << *ptr;\n```",
        options: [
            "5",
            "0",
            "Error",
            "Memory address of x"
        ],
        answer: 1
    },
    {
        question: "In C++, what does the `virtual` keyword do?",
        options: [
            "Declares a variable as global",
            "Specifies that a function may be overridden in derived classes",
            "Imports a library",
            "Represents a constant"
        ],
        answer: 2
    },
    {
        question: "What is the correct way to initialize an array in C++ with values {1, 2, 3, 4, 5}?",
        options: [
            "int arr[] = {1, 2, 3, 4, 5};",
            "int arr[5] = {1, 2, 3, 4, 5};",
            "int arr[5] {1, 2, 3, 4, 5};",
            "int arr[5]; arr = {1, 2, 3, 4, 5};"
        ],
        answer: 2
    },
    {
        question: "What is the output of `sizeof(int)` in C++?",
        options: [
            "Depends on the system",
            "4 bytes",
            "8 bytes",
            "2 bytes"
        ],
        answer: 1
    },
    {
        question: "What is the purpose of the `const` keyword in C++?",
        options: [
            "Indicates that a variable's value cannot be changed",
            "Defines a constant",
            "Declares a function as constant",
            "All of the above"
        ],
        answer: 4
    },
    {
        question: "What is the correct syntax for a function prototype in C++?",
        options: [
            "void funcName();",
            "funcName(void);",
            "void funcName(void);",
            "funcName;"
        ],
        answer: 3
    },
    {
        question: "What does the `static` keyword do in C++?",
        options: [
            "Makes a variable global",
            "Allocates memory dynamically",
            "Retains the value of a variable between function calls",
            "None of the above"
        ],
        answer: 3
    },
    {
        question: "Which operator is used for accessing members of a structure in C++?",
        options: [
            "->",
            ".",
            ":",
            "::"
        ],
        answer: 2
    },
    {
        question: "What is the correct way to define a class in C++?",
        options: [
            "class MyClass;",
            "class MyClass() {}",
            "MyClass : class {}",
            "class MyClass {}"
        ],
        answer: 4
    },
    {
        question: "What is the output of the following code?\n```cpp\nint x = 5;\nif (x > 10) {\n    std::cout << \"Greater\";\n} else {\n    std::cout << \"Smaller\";\n}\n```",
        options: [
            "Greater",
            "Smaller",
            "Error",
            "No output"
        ],
        answer: 2
    },
    {
        question: "Which header file is needed for input and output operations in C++?",
        options: [
            "<stdio.h>",
            "<stdlib.h>",
            "<iostream>",
            "<math.h>"
        ],
        answer: 3
    },
    {
        question: "What is the output of the following code?\n```cpp\nint x = 10;\nstd::cout << x++;\n```",
        options: [
            "10",
            "11",
            "0",
            "Error"
        ],
        answer: 1
    },
    {
        question: "What is the purpose of the `friend` keyword in C++?",
        options: [
            "Specifies a function as a friend of a class",
            "Declares a global function",
            "Makes a function static",
            "None of the above"
        ],
        answer: 1
    },
    {
        question: "What is the output of the following code?\n```cpp\nint arr[] = {1, 2, 3};\nstd::cout << arr[3];\n```",
        options: [
            "0",
            "1",
            "2",
            "Error"
        ],
        answer: 4
    },
    {
        question: "Which loop in C++ is used to execute a block of code a fixed number of times?",
        options: [
            "for loop",
            "while loop",
            "do-while loop",
            "if-else loop"
        ],
        answer: 1
    },
    {
        question: "What is the correct way to define a constant in C++?",
        options: [
            "#define PI 3.14",
            "const float PI = 3.14;",
            "constant PI = 3.14;",
            "PI = 3.14;"
        ],
        answer: 2
    },
    {
        question: "What is the output of the following code?\n```cpp\nint x = 5;\nint y = 3;\nstd::cout << (x > y ? x : y);\n```",
        options: [
            "5",
            "3",
            "0",
            "Error"
        ],
        answer: 1
    },
    {
        question: "What does the `break` statement do in a loop in C++?",
        options: [
            "Ends the program",
            "Exits the current loop",
            "Continues to the next iteration of the loop",
            "None of the above"
        ],
        answer: 2
    },
    {
        question: "What is the output of `sizeof(char)` in C++?",
        options: [
            "1 byte",
            "2 bytes",
            "Depends on the system",
            "Error"
        ],
        answer: 1
    },
    {
        question: "What is the purpose of the `inline` keyword in C++?",
        options: [
            "Optimizes the code by replacing function calls with function code",
            "Defines a function as constant",
            "Imports a library",
            "None of the above"
        ],
        answer: 1
    }
];
