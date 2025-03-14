package com.example.hakatonovertask.mappers;

import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {
    List<ScheldueDayOut> fromScheduleListToScheduleOutDto(List<ScheduleDay> scheduleDay);

    @Mapping(target = "lessonName" , source = "lesson.lessonName")
    @Mapping(target = "lessonDescription" , source = "lesson.description")
    @Mapping(target = "firstName" , source = "organizerLastName")
    @Mapping(target = "lastName" , source = "organizerFirstName")
    ScheldueDayOut fromScheduleToScheduleOutDto(ScheduleDay scheduleDay);

}
