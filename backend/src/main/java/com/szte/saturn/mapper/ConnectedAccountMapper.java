package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ConnectedAccountDTO;
import com.szte.saturn.entities.ConnectedAccount;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ConnectedAccountMapper {

    private final ModelMapper modelMapper;

    public ConnectedAccountDTO toDTO(final ConnectedAccount connectedAccount) {
        return modelMapper.map(connectedAccount, ConnectedAccountDTO.class);
    }

    public List<ConnectedAccountDTO> toListDTO(final List<ConnectedAccount> connectedAccounts) {
        return connectedAccounts.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
