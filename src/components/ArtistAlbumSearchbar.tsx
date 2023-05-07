import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchIconWrapper = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  center: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const SearchInput = styled(InputBase)`
  color: #fafafa;
  padding: 10px 10px 10px 45px;
  border-radius: 50px;
  border-color: whitesmoke;
  background-color: #191414;
  width: 500px;
`;

const LoadingSpinner = styled(CircularProgress)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
`;

interface Props {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

const ArtistAlbumSearchbar: React.FC<Props> = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <SearchIconWrapper />
                <SearchInput
                    placeholder="Example: Justin Bieber"
                    inputProps={{ "aria-label": "search for an artist" }}
                    onChange={handleSearch}
                />
                {isLoading && <LoadingSpinner size={24} />}
            </form>
        </Container>
    );
};

// export default withStyles(styles)(ArtistAlbumSearchbar);
export default ArtistAlbumSearchbar;

