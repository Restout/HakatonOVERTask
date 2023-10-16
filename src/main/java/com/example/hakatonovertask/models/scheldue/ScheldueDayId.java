package com.example.hakatonovertask.models.scheldue;

import com.example.hakatonovertask.models.groups.Group;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheldueDayId implements Serializable {
    private Date day;
    private Date startTime;
    private Date endTime;
    @ManyToOne
    @JoinColumn(name="groupid")
    private Group group;
}
