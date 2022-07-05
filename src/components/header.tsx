import React, { useState } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Divider,
  Burger,
  Center,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import {
  Logout,
  Heart,
  Star,
  Message,
  Settings,
  PlayerPause,
  Trash,
  SwitchHorizontal,
  ChevronDown,
  Sun,
  Moon,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
  },

  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  iconWrapper: {
    height: 30,
    width: 30,
    borderRadius: 28,
    cursor: 'pointer',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.yellow[4]
        : theme.colors.dark[4],
  },
}));

interface IProps {
  colorScheme: any;
  toggleColorScheme: () => void;
  userName?: string;
}

const Header = ({ userName, colorScheme, toggleColorScheme }: IProps) => {
  const { classes, theme, cx } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const Icon = colorScheme === 'dark' ? Sun : Moon;
  const ThemeChanger = () => (
    <Group position="center" my="xl">
      <Center className={classes.iconWrapper} aria-label="Toggle theme">
        <Icon onClick={() => toggleColorScheme()} />
      </Center>
    </Group>
  );

  return (
    <div className={classes.header}>
      <Container>
        <Group position="apart">
          <div>logo</div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              height: '70px',
            }}
          >
            <Burger
              opened={opened}
              onClick={() => toggleOpened()}
              className={classes.burger}
              size="sm"
            />

            {userName && (
              <Menu
                size={260}
                placement="end"
                transition="pop-top-right"
                className={classes.userMenu}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                control={
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={0} style={{ padding: '2px 5px' }}>
                      <Avatar alt={userName} radius="xl" size={30} />
                      <Text
                        weight={500}
                        size="sm"
                        sx={{ lineHeight: 1 }}
                        mr={3}
                      >
                        {userName}
                      </Text>
                      <ChevronDown size={15} />
                    </Group>
                  </UnstyledButton>
                }
              >
                <Menu.Item
                  icon={<Heart size={14} color={theme.colors.red[6]} />}
                >
                  Liked posts
                </Menu.Item>
                <Menu.Item
                  icon={<Star size={14} color={theme.colors.yellow[6]} />}
                >
                  Saved posts
                </Menu.Item>
                <Menu.Item
                  icon={<Message size={14} color={theme.colors.blue[6]} />}
                >
                  Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<Settings size={14} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item icon={<SwitchHorizontal size={14} />}>
                  Change account
                </Menu.Item>
                <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

                <Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<PlayerPause size={14} />}>
                  Pause subscription
                </Menu.Item>
                <Menu.Item color="red" icon={<Trash size={14} />}>
                  Delete account
                </Menu.Item>
              </Menu>
            )}
            <ThemeChanger />
          </div>
        </Group>
      </Container>
    </div>
  );
};

export default Header;
