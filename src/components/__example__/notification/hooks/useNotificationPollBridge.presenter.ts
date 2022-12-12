import { useState, useEffect } from 'react';

import { useBoolean } from 'hooks';

import {
  publishNotificationPollBridge,
  unsubscribeFromNotificationPollBridge,
  NotificationType,
} from '../models/notification-poll-bridge.model';

const MOCKED_NOTIFICATIONS: NotificationType[] = [
  {
    id: '01',
    title: 'Direct Creative Liaison 🧹',
    message: `Id recusandae iste officia voluptatem minima quibusdam ut. Autem ut ullam nemo sequi
       fuga distinctio autem in alias. Illum libero et quia repudiandae quia fugit maxime 
       aspernatur delectus.`,
  },
  {
    id: '02',
    title: 'Emmanuel Onah is the GUY 🐒',
    message: `Id recusandae iste officia voluptatem minima quibusdam ut. Autem ut ullam nemo sequi
       fuga distinctio autem in alias. Illum libero et quia repudiandae quia fugit maxime 
       aspernatur delectus.`,
  },
  {
    id: '03',
    title: 'It can only get better 🧪',
    message: `Id recusandae iste officia voluptatem minima quibusdam ut. Autem ut ullam nemo sequi
       fuga distinctio autem in alias. Illum libero et quia repudiandae quia fugit maxime 
       aspernatur delectus.`,
  },
  {
    id: '04',
    title: 'Things fall apart 🪂',
    message: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
    vero optio suscipit! Fugiat officiis numquam porro. Laboriosam nesciunt blanditiis omnis commodi aperiam,
    deserunt, temporibus fugit ducimus ipsam nobis, fugiat deleniti ut consequatur? Velit rerum et culpa
    asperiores illo perferendis, nam aliquam amet quos animi voluptatem blanditiis pariatur dolores porro
    quod facilis! Culpa, maiores optio hic totam cumque nesciunt ullam aliquid ab omnis cum accusamus 
    tenetur pariatur labore eos ad neque mollitia odio beatae! Adipisci, repellendus libero asperiores
    iste ex incidunt aut consequatur porro corporis architecto ratione voluptatem ab dolor eligendi
    vero est fugit, molestias tempore. Eveniet harum, aspernatur excepturi id pariatur soluta recusandae
    omnis doloribus aperiam accusamus vitae nisi aliquid itaque totam est hic unde saepe facere iste,
    sint asperiores? Ipsum quae assumenda unde dicta quia nisi dolore numquam soluta quam, inventore 
    consequuntur aperiam, nesciunt blanditiis in praesentium natus laudantium ea illum illo non porro
    enim at. Modi neque dolorem, nihil odit maxime in, nobis, quasi quas nam possimus nostrum sint omnis.
    Dolore, commodi? Corrupti, repudiandae possimus sapiente harum alias voluptatem dolorum esse beatae!
    Corrupti dolores, possimus quia id eligendi dicta cupiditate exercitationem optio et quidem accusamus
    vitae autem illum sequi tenetur sit fugiat, molestias harum accusantium eaque neque sapiente! Aliquam
    id, nobis suscipit dolore deserunt voluptates voluptatibus maiores veniam, ullam dicta, temporibus amet
    adipisci labore repudiandae quia accusantium architecto animi mollitia cumque nihil eius quam saepe consequatur!
    Et totam at perspiciatis aspernatur quod sunt enim soluta dicta molestiae, modi, rem cumque officiis magni
    numquam quis error delectus ad! Aspernatur debitis necessitatibus, a dignissimos nobis id ex numquam facere,
    unde quidem exercitationem quo aliquam corrupti voluptate minima quibusdam obcaecati dolore alias architecto
    eum animi molestiae laboriosam consequuntur? Odit quidem iste aut ea beatae cupiditate impedit quam eaque dolore
    deserunt modi ratione sed, repudiandae, error voluptatem unde voluptatum quod, itaque aperiam officia quibusdam
    quasi eos. Officia, perspiciatis numquam molestias minima quidem iste voluptatem inventore, earum impedit, itaque
    perferendis? Impedit, perferendis dignissimos. Quidem iusto deleniti asperiores voluptatibus explicabo harum,
    incidunt porro magnam laboriosam aliquam cupiditate. Minima ullam odit velit! Doloribus facilis eveniet quis enim,
    odio quam corrupti sed voluptatum minus, mollitia nisi voluptatem`,
  },
];

export function useNotificationPollBridge() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [hasNewNotification, { setToFalse: setHasNewNotificationToFalse, setToTrue: setHasNewNotificationToTrue }] =
    useBoolean();

  const notificationsSize = notifications.length;
  const hasPulledAllNotifications = notificationsSize === MOCKED_NOTIFICATIONS.length;

  /// ********************************************************************/
  useEffect(() => {
    let updateNotificationIntervalRegistryRef: ReturnType<typeof setInterval>;

    if (!hasPulledAllNotifications) {
      updateNotificationIntervalRegistryRef = setInterval(function updateNotification() {
        setNotifications((prev) => [...prev, MOCKED_NOTIFICATIONS[notificationsSize]]);
        setHasNewNotificationToTrue();
      }, 10000);
    }

    return function componentWillUnmount() {
      clearInterval(updateNotificationIntervalRegistryRef);
    };
  }, [hasPulledAllNotifications, notificationsSize, setHasNewNotificationToTrue]);

  /// ********************************************************************/
  useEffect(() => {
    publishNotificationPollBridge({ hasNewNotification, notifications });

    return function componentWillUnmount() {
      unsubscribeFromNotificationPollBridge();
    };
  }, [hasNewNotification, notifications]);

  function openNotification() {
    if (hasPulledAllNotifications) setHasNewNotificationToFalse();
  }

  function closeNotification() {
    if (hasPulledAllNotifications) setHasNewNotificationToFalse();
  }

  return {
    hasNewNotification,
    notifications,
    hasNotification: !!notifications.length,
    openNotification,
    closeNotification,
  };
}
