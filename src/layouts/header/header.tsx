import * as React from 'react';
import styled from 'styled-components';

import { Notification } from 'components';

const HeaderNode = styled.header`
  padding: 1rem;
  border-bottom: solid 1px #eee;
  display: flex;
  justify-content: space-between;

  & > * {
    font-size: 1.3rem;
  }

  & a {
  }
`;

const Important = styled.p`
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;

  & a {
    color: #1e90ff;
  }
`;

type PrimitiveHeaderPropTypes = React.ComponentPropsWithoutRef<'header'>;
type HeaderElement = React.ElementRef<'header'>;
interface HeaderPropTypes extends PrimitiveHeaderPropTypes {}

export const Header = React.forwardRef<HeaderElement, HeaderPropTypes>(function Header(props, forwardedRef) {
  return (
    <HeaderNode {...props} ref={forwardedRef}>
      <h1>Welcome to React MVP Experiment 🧪</h1>

      <Notification.Root>
        <Notification.Icon hasNewNotification />

        <Notification.Content.Root>
          <Notification.Content.Heading>
            Whats New ✨
            <Important>
              Stay up to date with the newest updates and improvements in React MVP experiment.{' '}
              <a href="https://github.com/emmanuelonah/react-mvp" target="_blank" rel="noreferrer">
                Visit codebase
              </a>
            </Important>
          </Notification.Content.Heading>

          <Notification.Content.Body>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi vero optio suscipit! Fugiat officiis
            numquam porro. Laboriosam nesciunt blanditiis omnis commodi aperiam, deserunt, temporibus fugit ducimus
            ipsam nobis, fugiat deleniti ut consequatur? Velit rerum et culpa asperiores illo perferendis, nam aliquam
            amet quos animi voluptatem blanditiis pariatur dolores porro quod facilis! Culpa, maiores optio hic totam
            cumque nesciunt ullam aliquid ab omnis cum accusamus tenetur pariatur labore eos ad neque mollitia odio
            beatae! Adipisci, repellendus libero asperiores iste ex incidunt aut consequatur porro corporis architecto
            ratione voluptatem ab dolor eligendi vero est fugit, molestias tempore. Eveniet harum, aspernatur excepturi
            id pariatur soluta recusandae omnis doloribus aperiam accusamus vitae nisi aliquid itaque totam est hic unde
            saepe facere iste, sint asperiores? Ipsum quae assumenda unde dicta quia nisi dolore numquam soluta quam,
            inventore consequuntur aperiam, nesciunt blanditiis in praesentium natus laudantium ea illum illo non porro
            enim at. Modi neque dolorem, nihil odit maxime in, nobis, quasi quas nam possimus nostrum sint omnis.
            Dolore, commodi? Corrupti, repudiandae possimus sapiente harum alias voluptatem dolorum esse beatae!
            Corrupti dolores, possimus quia id eligendi dicta cupiditate exercitationem optio et quidem accusamus vitae
            autem illum sequi tenetur sit fugiat, molestias harum accusantium eaque neque sapiente! Aliquam id, nobis
            suscipit dolore deserunt voluptates voluptatibus maiores veniam, ullam dicta, temporibus amet adipisci
            labore repudiandae quia accusantium architecto animi mollitia cumque nihil eius quam saepe consequatur! Et
            totam at perspiciatis aspernatur quod sunt enim soluta dicta molestiae, modi, rem cumque officiis magni
            numquam quis error delectus ad! Aspernatur debitis necessitatibus, a dignissimos nobis id ex numquam facere,
            unde quidem exercitationem quo aliquam corrupti voluptate minima quibusdam obcaecati dolore alias architecto
            eum animi molestiae laboriosam consequuntur? Odit quidem iste aut ea beatae cupiditate impedit quam eaque
            dolore deserunt modi ratione sed, repudiandae, error voluptatem unde voluptatum quod, itaque aperiam officia
            quibusdam quasi eos. Officia, perspiciatis numquam molestias minima quidem iste voluptatem inventore, earum
            impedit, itaque perferendis? Impedit, perferendis dignissimos. Quidem iusto deleniti asperiores voluptatibus
            explicabo harum, labore, incidunt porro magnam laboriosam aliquam cupiditate. Minima ullam odit velit!
            Doloribus facilis eveniet quis enim, odio quam corrupti sed voluptatum minus, mollitia nisi voluptatem
          </Notification.Content.Body>
        </Notification.Content.Root>
      </Notification.Root>
    </HeaderNode>
  );
});
