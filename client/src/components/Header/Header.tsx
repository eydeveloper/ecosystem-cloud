import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import ButtonVariantContained from '../Common/Button/_variant/Button_variant_contained';
import TypographyVariantH6 from '../Common/Typography/_variant/Typography_variant_h6';
import styles from './Header.module.scss';
import HeaderMenu from './HeaderMenu/HeaderMenu';

const Header: FC = () => {
  const {isAuthorized} = useAppSelector(state => state.auth);

  return (
    <AppBar className={styles.Bar}>
      <Container className={styles.Container}>
        <Toolbar className={styles.Toolbar}>
          <TypographyVariantH6 className={styles.Logo}>
            <Link to="/">Экосистема.Облако</Link>
          </TypographyVariantH6>
          <Box>
            {isAuthorized ? <HeaderMenu /> :
              <ButtonVariantContained>
                <Link to="/login">
                  Войти
                </Link>
              </ButtonVariantContained>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
