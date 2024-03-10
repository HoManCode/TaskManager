package com.TaskManagement.TM.model;

import com.TaskManagement.TM.Enum.Authority;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name="authorities")
public class Authorities implements GrantedAuthority {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Getter
    @ManyToOne
    @JsonIgnore
    private User user;
    private Authority authority;

    public Authorities() {
    }

    public Authorities(String auth){
        switch (auth){
            case ("ADMIN"):
                authority = Authority.ROLE_ADMIN;
                break;
            case ("MANAGER"):
                authority = Authority.ROLE_MANAGER;
                break;
            case ("EMPLOYEE"):
                authority = Authority.ROLE_EMPLOYEE;
                break;
        }
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String getAuthority() {
        return authority.toString();
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((authority == null) ? 0 : authority.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Authorities other = (Authorities) obj;
        if (authority == null) {
            if (other.authority != null)
                return false;
        } else if (!authority.equals(other.authority))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return this.authority.toString();
    }

}
