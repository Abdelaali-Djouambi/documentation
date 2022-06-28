### Maven

###### Definition

Maven is an Appache software, used for project management. It is the most popular build tool in the java ecosystem, it manages dependencies and distributs artifacts (projects) based on POM files (project object model), which is the fundamental unit of work in Maven. It is an XML file that contains information about the project and configuration details used by Maven to build the project.

In the pom file, we can specify which type of artifact Maven will create from our project, the default value is jar, but it can be modified to build a war for example, if we want to package a war for example.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <packaging>war</packaging>
  ...
</project>
```

###### What is a dependency

A dependency is just another archive -JAR, ZIP, and so on- which our current project needs in order to compile, build, test, and/or run. These project dependencies are collectively specified in the pom.

The standard structure of a dependency is as follows:

```xml
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>2.4.5</version>
    <scope>compile</scope>
    <optional>false</scope>
</dependency>
```

- groupId, artifactId: directly the corresponding coordinates of the dependency,
- version: a dependency version requirement specification, that is used to compute the dependency's effective version.
- scope: This element refers to the classpath of the task at hand (compiling and runtime, testing, etc.) as well as how to limit the transitivity of a dependency.
- optional: Marks a dependency optional when this project itself is a dependency.

###### Maven scopes

Dependency scope is used to limit the transitivity of a dependency and to determine when a dependency is included in a classpath.
Each dependency of our maven project we add to the POM file, has a property called scope (using the <scope> tag).

There are 5 types of dependency scopes as follows (+1 deprecated):

1. Compile:

   This is the default scope when no other scope is provided, it means that the dependency is needed to be in the classpath in the compilation phase, and all the other build tasks of the project

2. Provided

   We use this scope to mark dependencies that should be provided at runtime by JDK or a container.
   A good use case for this scope would be a web application deployed in some container, where the container already provides some libraries itself. For example, this could be a web server that already provides the Servlet API at runtime.
   The provided dependencies are available only at compile time and in the test classpath of the project. These dependencies are also not transitive.

3. Runtime

   The dependencies with this scope are required at runtime. But we don't need them for the compilation of the project code. Because of that, dependencies marked with the runtime scope will be present in the runtime and test classpath, but they will be missing from the compile classpath.
   A JDBC driver is a good example of dependencies that should use the runtime scope.

4. Test
   We use this scope to indicate that dependency isn't required at standard runtime of the application but is used only for test purposes.
   Test dependencies aren't transitive and are only present for test and execution classpaths.
   The standard use case for this scope is adding a test library such as JUnit to our application.

5. Import

   It's only available for the dependency type pom.
   import indicates that this dependency should be replaced with all effective dependencies declared in its POM.
   Here, below custom-project dependency will be replaced with all dependencies declared in custom-project's pom.xml <dependencyManagement> section.

```xml
<dependency>
    <groupId>com.baeldung</groupId>
    <artifactId>custom-project</artifactId>
    <version>1.3.2</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>

```

6. System (Deprecated)

   System scope is very similar to the provided scope. The main difference is that system requires us to directly point to a specific jar on the system.It's worthwhile to mention that system scope is deprecated.
   The important thing to remember is that building the project with system scope dependencies may fail on different machines if dependencies aren't present or are located in a different place than the one systemPath points to:

```xml
<dependency>
     <groupId>com.baeldung</groupId>
     <artifactId>custom-dependency</artifactId>
     <version>1.3.2</version>
     <scope>system</scope>
     <systemPath>${project.basedir}/libs/custom-dependency-1.3.2.jar</systemPath>
</dependency>
```

###### Dependencies and modules

In a maven project, we can have multi modules assembled to be one application, we define of these modules as the parent of all the sub-modules. Each module has its own dependencies, and if a dependency is duplicated on multiple modules, maven will only add only one version of this dependency to build and package the project.

The dependency that will be used is the dependency closest to the tree of the project example :
A
├── B
│ └── C
│ └── D 2.0
└── E
└── D 1.0
In this case the version 1.0 of D will be used because it is the first we find in the dependency tree.

###### Dependency management

The dependencyManagement bloc (<dependencyManagement> tag), and the best practice is to add it to the root pom file (parent pom file), in this bloc we will describe the dependencies, and for each dependency we will define three main tags, <gourpId>, <artifactId> and <version>, we could also specify the <scope>. The dependencies of the dependencyManagement bloc, will not be downloaded and added to the project dependency resource list, it will just set the version and the scope of the artifact, if we add its dependency in any module, it will take the specified version and scope in the dependencyManagement section the root POM file (usually called the "parent") and then using the dependencies in the childs POM files (sub-modules) and even the parent module itself (if applicable).

Root pom file (parent module) :

```xml
.
.
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
.
.
```

Sub-module POM file:

```xml
<dependencies>
   <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
    </dependency>
</dependencies>
```

###### Maven goals

- Validate : validate the project is correct and all necessary information is available
- Compile : compile the source code of the project
- Test : test the compiled source code using a suitable unit testing framework. These tests should not require the code be packaged or deployed
- Package : take the compiled code and package it in its distributable format, such as a JAR.
- Verify : run any checks on results of integration tests to ensure quality criteria are met
- Install : Compile and package your product build and also install the package into the local repository, for use as a dependency in other projects locally
- Deploy : done in the build environment, copies the final package to the remote repository for sharing with other developers and projects.
