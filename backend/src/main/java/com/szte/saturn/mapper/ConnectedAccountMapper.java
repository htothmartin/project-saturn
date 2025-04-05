package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ConnectedAccountDTO;
import com.szte.saturn.entities.ConnectedAccount;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConnectedAccountMapper {

    @Autowired
    private ModelMapper modelMapper;

    public ConnectedAccountDTO toDTO(final ConnectedAccount connectedAccount) {
        return modelMapper.map(connectedAccount, ConnectedAccountDTO.class);
    }

    public List<ConnectedAccountDTO> toListDTO(final List<ConnectedAccount> connectedAccounts) {
        return connectedAccounts.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
