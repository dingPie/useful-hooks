## 유용한 hooks 모음

실무에서 직접 짠 코드 중 재사용성이 높은 hooks 및 코드를 모았습니다.

## Hooks

<br />

### useMultipleKeyEventEffect

여러가지 키보드 이벤트를 보다 쉽게 관리하기 위한 hooks 입니다.

```ts
useMultipleKeyEventEffect({
  diff: 300,
  keyEvent: {
    Enter: [
      ,
      // 객체의 key는 각 키보드의 키로 지정합니다.
      // N번째 클릭마다 이벤트를 할당합니다. 1번 클릭 이벤트는 불필요하여 비워둡니다.
      () => {
        console.log('Enter, 2번 클릭 이벤트');
      },
      () => {
        console.log('Enter, 3번 클릭 이벤트');
      },
    ],
    ' ': [() => console.log('스페이스 한번')],
  },
});
```

<br />
