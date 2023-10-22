CREATE SEQUENCE public."Applications_ApplicationsID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Container_ContainerID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Course_CourseID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Enrollee_ID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Groups_GroupID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Images_NewsID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Lesson_LessonID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Materials_materialid_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."News_NewsID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."ScheduleDay_scheldueid_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."SelectionCommittee_ID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Supervisior_ID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."Tasks_TaskID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."User_ID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE SEQUENCE public."files_FilesID_seq" START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 NO CYCLE CACHE 1;
CREATE TABLE "Course" (
                          "CourseID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                          "CourseName" varchar NULL,
                          "About" text NULL,
                          "Programm" text NULL,
                          "Requirements" text NULL,
                          "Result" text NULL,
                          CONSTRAINT "XPKCourse"
                              PRIMARY KEY ("CourseID")
);
CREATE TABLE "Lesson" (
                          "LessonID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                          "LessonName" varchar(100) NULL,
                          "Description" varchar(100) NULL,
                          CONSTRAINT "XPKLesson"
                              PRIMARY KEY ("LessonID")
);
CREATE TABLE "News" (
                        "NewsID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                        publish_date date NULL,
                        "Title" varchar(100) NULL,
                        "Content" varchar(100) NULL,
                        "Image" varchar(100) NULL,
                        CONSTRAINT "XPKNews"
                            PRIMARY KEY ("NewsID")
);
CREATE TABLE "User" (
                        "ID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                        "First_name" varchar(50) NULL,
                        "Last_name" varchar(50) NULL,
                        "Father_name" varchar(50) NULL,
                        "Birthday" date NULL,
                        "Phone" varchar(20) NULL,
                        "Email" varchar(50) NULL,
                        "Password" varchar(20) NULL,
                        "Role" varchar(30) NULL,
                        CONSTRAINT "XPKUser"
                            PRIMARY KEY ("ID"),
                        CONSTRAINT user_un
                            UNIQUE ("Email")
);
CREATE TABLE files (
                       "FileName" varchar(100) NULL,
                       "File" bytea NULL,
                       "FilesID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                       CONSTRAINT files_pk
                           PRIMARY KEY ("FilesID")
);
CREATE TABLE "Enrollee" (
                            "ID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                            CONSTRAINT "XPKEnrollee"
                                PRIMARY KEY ("ID"),
                            CONSTRAINT "Is_a_User"
                                FOREIGN KEY ("ID")
                                    REFERENCES "User" ("ID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Images" (
                          "NewsID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                          "Image" bytea NULL,
                          CONSTRAINT "XPKImages"
                              PRIMARY KEY ("NewsID"),
                          CONSTRAINT "R_32"
                              FOREIGN KEY ("NewsID")
                                  REFERENCES "News" ("NewsID")
);
CREATE TABLE "SelectionCommittee" (
                                      "ID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                                      CONSTRAINT "XPKSelectionCommittee"
                                          PRIMARY KEY ("ID"),
                                      CONSTRAINT "Is_a_User"
                                          FOREIGN KEY ("ID")
                                              REFERENCES "User" ("ID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Supervisior" (
                               "ID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                               CONSTRAINT "XPKSupervisior"
                                   PRIMARY KEY ("ID"),
                               CONSTRAINT "Is_a_User"
                                   FOREIGN KEY ("ID")
                                       REFERENCES "User" ("ID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Teacher" (
                           "AcademicDegree" varchar(20) NULL,
                           "AcademicTitle" varchar(20) NULL,
                           "ID" int NOT NULL,
                           CONSTRAINT "XPKTeacher"
                               PRIMARY KEY ("ID"),
                           CONSTRAINT "Is_a_User"
                               FOREIGN KEY ("ID")
                                   REFERENCES "User" ("ID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Applications" (
                                "ApplicationsID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                                "CourseID" int NULL,
                                "ID" int NULL,
                                "Status" varchar(20) NULL,
                                "Merits" text NULL,
                                "MotivationLetter" text NULL,
                                "ChiefID" int NULL,
                                "CurrentPosition" text NULL,
                                "DepartmentName" text NULL,
                                "Experience" int NULL,
                                "DateOfChange" date NULL,
                                CONSTRAINT "XPKApplications"
                                    PRIMARY KEY ("ApplicationsID"),
                                CONSTRAINT "R_1"
                                    FOREIGN KEY ("ID")
                                        REFERENCES "Enrollee" ("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                                CONSTRAINT "R_5"
                                    FOREIGN KEY ("CourseID")
                                        REFERENCES "Course" ("CourseID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Groups" (
                          "GroupID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                          "ID" int NULL,
                          "CourseID" int NULL,
                          "GroupName" varchar(20) NULL,
                          CONSTRAINT "XPKGroups"
                              PRIMARY KEY ("GroupID"),
                          CONSTRAINT "R_4"
                              FOREIGN KEY ("ID")
                                  REFERENCES "Supervisior" ("ID") ON DELETE SET NULL ON UPDATE CASCADE,
                          CONSTRAINT "R_44"
                              FOREIGN KEY ("CourseID")
                                  REFERENCES "Course" ("CourseID") ON DELETE SET NULL
);
CREATE TABLE "LessonTeacher" (
                                 "LessonID" int NOT NULL,
                                 "ID" int NOT NULL,
                                 CONSTRAINT "XPKLessonTeacher"
                                     PRIMARY KEY ("LessonID", "ID"),
                                 CONSTRAINT "R_14"
                                     FOREIGN KEY ("ID")
                                         REFERENCES "Teacher" ("ID") ON DELETE SET NULL ON UPDATE CASCADE,
                                 CONSTRAINT "R_16"
                                     FOREIGN KEY ("LessonID")
                                         REFERENCES "Lesson" ("LessonID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "ScheduleDay" (
                               "Day" date NOT NULL,
                               "Time" time NOT NULL,
                               "GroupID" int NOT NULL,
                               "Audience" varchar(20) NULL,
                               "TimeEnd" time NOT NULL,
                               "LessonID" int NULL,
                               "ID" int NULL,
                               "ScheldueID" int NOT NULL,
                               CONSTRAINT scheduleday_pk
                                   PRIMARY KEY ("ScheldueID"),
                               CONSTRAINT "R_25"
                                   FOREIGN KEY ("GroupID")
                                       REFERENCES "Groups" ("GroupID"),
                               CONSTRAINT "R_42"
                                   FOREIGN KEY ("LessonID", "ID")
                                       REFERENCES "LessonTeacher" ("LessonID", "ID") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE "Student" (
                           "GroupID" int NULL,
                           "RecordBookID" int NULL,
                           "ID" int NOT NULL,
                           CONSTRAINT "XPKStudent"
                               PRIMARY KEY ("ID"),
                           CONSTRAINT "Is_a_User"
                               FOREIGN KEY ("ID")
                                   REFERENCES "User" ("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                           CONSTRAINT "R_2"
                               FOREIGN KEY ("GroupID")
                                   REFERENCES "Groups" ("GroupID") ON DELETE SET NULL
);
CREATE TABLE "Attendance" (
                              has_been boolean NOT NULL DEFAULT FALSE,
                              "ScheduleID" int NOT NULL,
                              "StudentID" int NOT NULL,
                              CONSTRAINT attendance_pk
                                  PRIMARY KEY ("ScheduleID", "StudentID"),
                              CONSTRAINT attendance_fk
                                  FOREIGN KEY ("StudentID")
                                      REFERENCES "Student" ("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                              CONSTRAINT attendance_fk_1
                                  FOREIGN KEY ("ScheduleID")
                                      REFERENCES "ScheduleDay" ("ScheldueID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Container" (
                             "ContainerID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                             "ID" int NOT NULL,
                             "LessonID" int NULL,
                             "TeacherID" int NULL,
                             CONSTRAINT container_pk
                                 PRIMARY KEY ("ContainerID"),
                             CONSTRAINT "R_24"
                                 FOREIGN KEY ("ID")
                                     REFERENCES "Student" ("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                             CONSTRAINT container_fk
                                 FOREIGN KEY ("LessonID", "TeacherID")
                                     REFERENCES "LessonTeacher" ("LessonID", "ID") ON UPDATE CASCADE
);
CREATE TABLE "Materials" (
                             "ContainerID" int NOT NULL,
                             "DateStart" date NOT NULL,
                             "DateEnd" date NULL,
                             "Description" text NULL,
                             "MaterialID" int NOT NULL,
                             "Title" text NULL,
                             CONSTRAINT materials_pk
                                 PRIMARY KEY ("MaterialID"),
                             CONSTRAINT materials_fk
                                 FOREIGN KEY ("ContainerID")
                                     REFERENCES "Container" ("ContainerID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Practical" (
                             "MaterialID" int NOT NULL,
                             "FileID" int NOT NULL,
                             CONSTRAINT practical_pk
                                 PRIMARY KEY ("FileID", "MaterialID"),
                             CONSTRAINT "Practical_FileID_fkey"
                                 FOREIGN KEY ("FileID")
                                     REFERENCES files ("FilesID"),
                             CONSTRAINT "Practical_MaterialID_fkey"
                                 FOREIGN KEY ("MaterialID")
                                     REFERENCES "Materials" ("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Tasks" (
                         "MaterialID" int NULL,
                         "Description" text NULL,
                         "Title" varchar(100) NULL,
                         "TaskID" int GENERATED BY DEFAULT AS IDENTITY NOT NULL,
                         "Grade" int NULL,
                         CONSTRAINT tasks_pk
                             PRIMARY KEY ("TaskID"),
                         CONSTRAINT tasks_fk
                             FOREIGN KEY ("MaterialID")
                                 REFERENCES "Materials" ("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Theoretical" (
                               "MaterialID" int NOT NULL,
                               "FileID" int NOT NULL,
                               CONSTRAINT theoretical_pk
                                   PRIMARY KEY ("MaterialID", "FileID"),
                               CONSTRAINT "Theoretical_FileID_fkey"
                                   FOREIGN KEY ("FileID")
                                       REFERENCES files ("FilesID") ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT "Theoretical_MaterialID_fkey"
                                   FOREIGN KEY ("MaterialID")
                                       REFERENCES "Materials" ("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Answer" (
                          "TaskID" int NOT NULL,
                          "FileID" int NOT NULL,
                          CONSTRAINT answer_pk
                              PRIMARY KEY ("TaskID", "FileID"),
                          CONSTRAINT "Answer_FileID_fkey"
                              FOREIGN KEY ("FileID")
                                  REFERENCES files ("FilesID"),
                          CONSTRAINT "Answer_TaskID_fkey"
                              FOREIGN KEY ("TaskID")
                                  REFERENCES "Tasks" ("TaskID") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Independent" (
                               "MaterialID" int NOT NULL,
                               "FileID" int NOT NULL,
                               CONSTRAINT independent_pk
                                   PRIMARY KEY ("MaterialID", "FileID"),
                               CONSTRAINT "Independent_FileID_fkey"
                                   FOREIGN KEY ("FileID")
                                       REFERENCES files ("FilesID"),
                               CONSTRAINT "Independent_MaterialID_fkey"
                                   FOREIGN KEY ("MaterialID")
                                       REFERENCES "Materials" ("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "User"
("First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role")
VALUES('Рамилио', 'Порфаворо', 'Рахимкулово', '2022-10-10', '+79213372825', 'admin@mail.ru', 'admin', 'ADMIN');
