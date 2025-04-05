package com.szte.saturn.repositories;

import com.szte.saturn.entities.ConnectedAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConnectedAccountRepository extends JpaRepository<ConnectedAccount, Long> {
    @Query("SELECT a FROM ConnectedAccount a "
            + "WHERE a.provider = :provider AND a.providerId = :providerId")
    Optional<ConnectedAccount> findByProviderAndProviderId(
            @Param("provider") String provider,
            @Param("providerId") String providerId);
}
