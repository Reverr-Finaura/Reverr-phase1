# Reverr

`“One thing most software architects fail to realize is that a software architect is also a leader.”`
― Richard Monson-Haefel.

### A typical top-level directory layout

    ..
        ├── src             # The base of our application
        ├── .flowconfig     # The type annotator file
        ├── _test_          # Automated tests
    └── README.md

### Source files

    src
        ├── assets          # cached assets for the app
        ├── components      # common components
        ├── layout          # parent layout components (HOC)
        ├── scenes          # individual screens for the app
        ├── utils           # utilities for the complete app
        ├── services        # the complete app services folder

### Code Pattern

- <b>Imports</b> - We need to ensure while importing the code, if it's an external library or react's library should be on the top most level. Next comes the custom components that we will use or create. Following them are services, utils, and styles to be exported from a single standpoint.
- <b>Prettier</b> - Please use prettier for code formatting and ensuring a better and readable code.
- <b>Eslint</b> - A codebase/workspace is left out of office until proper linting is introduced.
- <b>Functions</b> - Make sure if the component/function or any utility is getting bigger than 35 lines of code, to detach it as much as possible.
- <b>Documentation</b> - Document your code properly following the documentation mechanism implemented in the app layout file, this will give a boost to productivity.

## To be continued ...
