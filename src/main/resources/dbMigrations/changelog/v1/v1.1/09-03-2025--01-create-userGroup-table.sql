--liquibase formatted sql

--changeset ArtemShevtsov:1
create table "UserGroups"(
     group_id BIGINT NOT NULL,
     user_id BIGINT NOT NULL,
     PRIMARY KEY (group_id, user_id),
     CONSTRAINT fk_usergroup_group FOREIGN KEY (group_id) REFERENCES "Groups" ("GroupID"),
     CONSTRAINT fk_usergroup_user FOREIGN KEY (user_id) REFERENCES "User"("ID")
)
--rollback drop table "UserGroups";

--changeset ArtemShevtsov:2
ALTER TABLE "Groups" DROP COLUMN "ID";
--rollback ALTER TABLE "Groups" ADD COLUMN "ID" int4 NOT NULL; ALTER TABLE "Groups" ADD CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE

--changeset ArtemShevtsov:3
ALTER TABLE "Groups" ADD COLUMN "CREATOR_ID" int4 NOT NULL;
--rollback ALTER TABLE "Groups" DROP COLUMN "CREATOR_ID";

--changeset ArtemShevtsov:4
ALTER TABLE "Groups" ADD CONSTRAINT fk_group_creator FOREIGN KEY ("CREATOR_ID") REFERENCES "User"("ID") ON UPDATE CASCADE ON DELETE CASCADE;
--rollback ALTER TABLE "Groups" DROP CONSTRAINT fk_group_creator;

--changeset ArtemShevtsov:5
ALTER TABLE "Student" DROP COLUMN "GroupID"
--rollback ALTER TABLE "Student" ADD COLUMN "GroupID" int4 NOT NULL; ALTER TABLE "Student" ADD CONSTRAINT fk_student_group FOREIGN KEY ("GroupID") REFERENCES "Groups"("ID");

--changeset ArtemShevtsov:6
DROP TABLE "LessonTeacher" CASCADE
--rollback CREATE TABLE "LessonTeacher"(lesson_id BIGINT NOT NULL, teacher_id BIGINT NOT NULL, PRIMARY KEY (lesson_id, teacher_id), CONSTRAINT fk_lessonteacher_lesson FOREIGN KEY (lesson_id) REFERENCES "Lesson" ("LessonID"), CONSTRAINT fk_lessonteacher_teacher FOREIGN KEY (teacher_id) REFERENCES "Teacher"("ID"));

--changeset ArtemShevtsov:7
alter table "ScheduleDay" add constraint fk_lesson_schedule foreign key ("LessonID") references "Lesson"("LessonID") on delete set null on update cascade
--rollback ALTER TABLE "ScheduleDay" DROP CONSTRAINT fk_lesson_schedule;

--changeset ArtemShevtsov:8
alter table "ScheduleDay" DROP COLUMN "ID";
--rollback ALTER TABLE "ScheduleDay" ADD COLUMN "ID";


